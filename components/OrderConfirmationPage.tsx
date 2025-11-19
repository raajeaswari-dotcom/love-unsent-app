import React, { useState, useEffect } from 'react';
import type { OrderDetails } from '../App';

interface OrderConfirmationPageProps {
    navigate: (page: string, props?: any) => void;
    orderDetails: OrderDetails | null;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ navigate, orderDetails }) => {
    
    if (!orderDetails) {
        return (
            <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-4xl font-black mb-4">No order details found.</h1>
                    <button
                        onClick={() => navigate('home')}
                        className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)]"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    const { shippingAddress } = orderDetails;

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24 flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
                <h1 className="font-display text-4xl md:text-5xl font-black mb-4">Thank You For Your Order!</h1>
                <p className="text-lg mb-8">Your order has been placed successfully.</p>
                
                <div className="max-w-2xl mx-auto bg-white/60 p-8 rounded-2xl text-left shadow-[0_8px_16px_rgba(91,44,35,0.08)]">
                    <h2 className="text-2xl font-bold mb-4">Order Confirmation #{orderDetails.orderNumber}</h2>
                    <p className="text-sm text-gray-600 mb-6">Placed on: {new Date(orderDetails.date).toLocaleString()}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Shipping To:</h3>
                            <p>{shippingAddress.fullName}</p>
                            <p>{shippingAddress.flat}, {shippingAddress.street}</p>
                            <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}</p>
                            <p>{shippingAddress.phone}</p>
                        </div>
                         <div>
                            <h3 className="font-bold text-lg mb-2">Delivery Details:</h3>
                            <p>Method: {orderDetails.deliveryMethod || 'Standard'}</p>
                            {orderDetails.deliveryDate && <p>Preferred Date: {new Date(orderDetails.deliveryDate).toLocaleDateString()}</p>}
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2">Order Summary:</h3>
                    <div className="space-y-2 mb-6">
                        {orderDetails.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span className="capitalize">{item.productName.toLowerCase()}</span>
                                <span>₹{item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-[#E9CBA7] mt-2 pt-2 space-y-1">
                        <div className="flex justify-between"><span>Subtotal</span><span>₹{orderDetails.subtotal.toFixed(2)}</span></div>
                        {orderDetails.discountAmount && orderDetails.discountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount ({orderDetails.couponCode})</span>
                                <span>- ₹{orderDetails.discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between"><span>Shipping</span><span>₹{orderDetails.shippingCost.toFixed(2)}</span></div>
                        {orderDetails.taxAmount > 0 && (
                            <div className="flex justify-between">
                                <span>GST</span>
                                <span>₹{orderDetails.taxAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-xl pt-2">
                            <span>Total</span>
                            <span>₹{orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('home')}
                    className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)] mt-12"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;