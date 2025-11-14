

import React, { useState, useMemo, useCallback } from 'react';
import type { CartItem, Coupon, User, ShippingAddress, OrderDetails } from '../App';

interface CheckoutPageProps {
    navigate: (page: string, props?: any) => void;
    cart: CartItem[];
    finalizeOrder: (verifiedOrder: OrderDetails) => void;
    coupons: Coupon[];
    user: User | null;
    addOnCosts?: { giftWrap?: number, perfume?: number };
}

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate, cart, finalizeOrder, coupons, user, addOnCosts = { giftWrap: 0, perfume: 0 } }) => {
    const [formState, setFormState] = useState({
        email: user?.email || '',
        fullName: user?.name || '',
        phone: user?.mobile || '',
        flat: user?.address?.flat || '',
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.zip || '',
    });

    const [deliveryMethod, setDeliveryMethod] = useState<'Standard' | 'Express'>('Standard');
    const [deliveryDate, setDeliveryDate] = useState('');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
    
    const [isCheckingPincode, setIsCheckingPincode] = useState(false);
    const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checked' | 'error'>('idle');
    const [pincodeMessage, setPincodeMessage] = useState('');
    const [shippingCost, setShippingCost] = useState(0);

    const { subtotal, taxAmount, discountAmount, finalTotal } = useMemo(() => {
        const calculatedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
        let calculatedDiscount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percentage') {
                calculatedDiscount = calculatedSubtotal * (appliedCoupon.value / 100);
            } else {
                calculatedDiscount = Math.min(calculatedSubtotal, appliedCoupon.value);
            }
        }
    
        const calculatedTax = cart.reduce((taxSum, item) => {
          const itemDiscount = calculatedSubtotal > 0 ? (item.price / calculatedSubtotal) * calculatedDiscount : 0;
          const taxableValue = (item.price * item.quantity) - itemDiscount;
          const itemTax = taxableValue * ((item.gstRate || 0) / 100);
          return taxSum + itemTax;
        }, 0);
    
        const total = calculatedSubtotal
                    + (addOnCosts.giftWrap || 0)
                    + (addOnCosts.perfume || 0)
                    - calculatedDiscount
                    + shippingCost
                    + calculatedTax;
    
        return {
            subtotal: calculatedSubtotal,
            taxAmount: calculatedTax,
            discountAmount: calculatedDiscount,
            finalTotal: total
        };
    }, [cart, appliedCoupon, addOnCosts, shippingCost]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'zip') {
            setPincodeStatus('idle');
            setPincodeMessage('');
            setShippingCost(0);
        }
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePincodeCheck = async () => {
        if (!formState.zip || formState.zip.length !== 6) {
            setPincodeMessage('Please enter a valid 6-digit pincode.');
            setPincodeStatus('error');
            return;
        }
        setIsCheckingPincode(true);
        setPincodeMessage('');
        try {
            const res = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/shipping/check/${formState.zip}`);

            const data = await res.json();
            if (res.ok && data.serviceable) {
                setPincodeStatus('checked');
                setPincodeMessage(`Deliverable to ${data.city}, ${data.state}.`);
                setShippingCost(deliveryMethod === 'Express' ? 99 : 50); // Set shipping cost on success
                setFormState(prev => ({ ...prev, city: data.city, state: data.state }));
            } else {
                setPincodeStatus('error');
                setPincodeMessage(data.message || 'Sorry, this pincode is not serviceable.');
                setShippingCost(0);
            }
        } catch (err) {
            setPincodeStatus('error');
            setPincodeMessage('Could not verify pincode. Please try again.');
            setShippingCost(0);
        } finally {
            setIsCheckingPincode(false);
        }
    };


    const handleApplyCoupon = () => {
        setCouponMessage({ type: '', text: '' });
        const couponToApply = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
        if (couponToApply) {
            if (couponToApply.isActive) {
                setAppliedCoupon(couponToApply);
                setCouponMessage({ type: 'success', text: `Coupon "${couponToApply.code}" applied successfully!` });
            } else {
                setCouponMessage({ type: 'error', text: 'This coupon is inactive.' });
                setAppliedCoupon(null);
            }
        } else {
            setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
            setAppliedCoupon(null);
        }
    };
    
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setCouponMessage({ type: '', text: '' });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (pincodeStatus !== 'checked') {
            setError('Please verify your pincode is serviceable before proceeding.');
            return;
        }

        const requiredFields: Array<keyof typeof formState> = ['email', 'fullName', 'phone', 'flat', 'street', 'city', 'state', 'zip'];
        for (const field of requiredFields) {
            if (!formState[field]) {
                setError('Please fill out all required fields.');
                return;
            }
        }

        setError('');
        setIsLoading(true);

        const shippingDetails: ShippingAddress = {
            fullName: formState.fullName,
            email: formState.email,
            phone: formState.phone,
            flat: formState.flat,
            street: formState.street,
            city: formState.city,
            state: formState.state,
            zip: formState.zip
        };

        const orderPayload = {
            items: cart,
            shippingAddress: shippingDetails,
            totalAmount: finalTotal,
            shippingCost: shippingCost, // Pass shipping cost
            addOns: addOnCosts,
            deliveryMethod,
            deliveryDate,
            couponCode: appliedCoupon?.code,
            discountAmount: discountAmount,
        };

        try {
            const res = await fetch('https://love-unsent-app-final-backend.onrender.com/api/orders', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            });

            if (!res.ok) throw new Error('Failed to create order');
            
            const finalOrder = await res.json();
            finalizeOrder(finalOrder);

        } catch (err) {
            console.error(err);
            setError("Could not create order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24">
            <div className="container mx-auto px-6">
                <h1 className="font-display text-4xl md:text-5xl font-black mb-12 text-center">Checkout</h1>
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left side: Order Summary */}
                    <div className="bg-white/60 p-8 rounded-2xl h-fit lg:sticky top-40">
                        <h2 className="text-2xl font-bold mb-6 border-b border-[#E9CBA7] pb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <span className="capitalize">{item.productName.toLowerCase()}</span>
                                    <span className="font-bold">₹{item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="my-6">
                            <div className="flex">
                                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon Code" className="flex-grow bg-transparent border border-[#8C6653] rounded-l-xl py-2 px-4 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                                <button onClick={handleApplyCoupon} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-r-xl hover:bg-opacity-90 transition-all">Apply</button>
                            </div>
                            {couponMessage.text && <p className={`mt-2 text-sm ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{couponMessage.text}</p>}
                        </div>
                        <div className="pt-6 border-t border-[#E9CBA7] space-y-2">
                            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                            {addOnCosts.giftWrap > 0 && <div className="flex justify-between"><span>Gift Wrap</span><span>₹{addOnCosts.giftWrap.toFixed(2)}</span></div>}
                            {addOnCosts.perfume > 0 && <div className="flex justify-between"><span>Perfume</span><span>₹{addOnCosts.perfume.toFixed(2)}</span></div>}
                            {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({appliedCoupon?.code}) <button onClick={handleRemoveCoupon} className="text-xs text-red-500 hover:underline">(Remove)</button></span><span>- ₹{discountAmount.toFixed(2)}</span></div>}
                            <div className="flex justify-between"><span>Shipping</span><span>{shippingCost > 0 ? `+₹${shippingCost.toFixed(2)}` : 'N/A'}</span></div>
                            <div className="flex justify-between"><span>GST</span><span>₹{taxAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between text-xl font-bold mt-2"><span >Total</span><span>₹{finalTotal.toFixed(2)}</span></div>
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <form onSubmit={handleFormSubmit} className="bg-white/60 p-8 rounded-2xl">
                        <div className="space-y-8">
                             <div>
                                <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
                                <div className="space-y-4">
                                    <input type="text" name="fullName" placeholder="Full Name *" value={formState.fullName} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                    <input type="email" name="email" placeholder="Email Address *" value={formState.email} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                    <input type="tel" name="phone" placeholder="Phone Number *" value={formState.phone} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                    <input type="text" name="flat" placeholder="Flat, House no., Building" value={formState.flat} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                                    <input type="text" name="street" placeholder="Street, Area, Village *" value={formState.street} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                     <div className="flex gap-4 items-start">
                                        <div className="flex-grow">
                                            <input type="text" name="zip" placeholder="PIN Code *" value={formState.zip} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                            {pincodeMessage && <p className={`mt-2 text-sm ${pincodeStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>{pincodeMessage}</p>}
                                        </div>
                                        <button type="button" onClick={handlePincodeCheck} disabled={isCheckingPincode} className="bg-[#8C6653] text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all h-[50px] disabled:bg-opacity-50">
                                            {isCheckingPincode ? '...' : 'Check'}
                                        </button>
                                    </div>
                                    <div className="flex gap-4">
                                        <input type="text" name="city" placeholder="Town/City *" value={formState.city} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" required/>
                                        <select name="state" value={formState.state} onChange={handleInputChange} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#5B2C23] appearance-none" required>
                                            <option value="">Select State *</option>
                                            {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Delivery Options</h2>
                                <div className="space-y-3">
                                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${deliveryMethod === 'Standard' ? 'border-[#5B2C23] ring-2 ring-[#5B2C23]' : 'border-[#8C6653]'}`}><input type="radio" name="deliveryMethod" value="Standard" checked={deliveryMethod === 'Standard'} onChange={() => setDeliveryMethod('Standard')} className="h-4 w-4 text-[#5B2C23] focus:ring-[#5B2C23]" /><span className="ml-3 font-semibold">Standard Delivery (+₹50)</span></label>
                                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${deliveryMethod === 'Express' ? 'border-[#5B2C23] ring-2 ring-[#5B2C23]' : 'border-[#8C6653]'}`}><input type="radio" name="deliveryMethod" value="Express" checked={deliveryMethod === 'Express'} onChange={() => setDeliveryMethod('Express')} className="h-4 w-4 text-[#5B2C23] focus:ring-[#5B2C23]" /><span className="ml-3 font-semibold">Express Delivery (+₹99)</span></label>
                                </div>
                                <div className="mt-4">
                                  <label htmlFor="deliveryDate" className="font-semibold mb-2 block">Preferred Delivery Date (Optional)</label>
                                  <input type="date" name="deliveryDate" id="deliveryDate" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="w-full bg-transparent border border-[#8C6653] rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-600 font-bold mt-4 text-center">{error}</p>}
                        <div className="mt-8 text-center">
                            <button type="submit" disabled={isLoading || pincodeStatus !== 'checked'} className="w-full bg-[#5B2C23] text-white font-bold py-4 px-12 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] text-lg flex items-center justify-center disabled:bg-opacity-70 disabled:cursor-not-allowed">
                                {isLoading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...</>) : (`Pay Securely - ₹${finalTotal.toFixed(2)}`)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;