import React, { useState, useMemo, useEffect } from 'react';
import type { OrderDetails } from '../App';

interface TrackOrderPageProps {
    orders: OrderDetails[];
    orderId?: string; // Prop for pre-filling
    navigate: (page: string, props?: any, anchor?: string) => void;
}

const statusSteps = ['Processing', 'Writing', 'Packaged', 'Shipped', 'Delivered'];

const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ orders, orderId: prefilledOrderId, navigate }) => {
    const [orderId, setOrderId] = useState(prefilledOrderId || '');
    const [error, setError] = useState('');
    const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(null);

    const findOrder = (id: string) => {
        if (!id) {
            setError('Please enter an Order ID.');
            setTrackedOrder(null);
            return;
        }
        const foundOrder = orders.find(o => o.orderNumber.toUpperCase() === id.toUpperCase());
        if (foundOrder) {
            setTrackedOrder(foundOrder);
            setError('');
        } else {
            setError('No order found with that ID. Please check and try again.');
            setTrackedOrder(null);
        }
    };

    useEffect(() => {
        if (prefilledOrderId) {
            findOrder(prefilledOrderId);
        }
    }, [prefilledOrderId, orders]);

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        findOrder(orderId);
    };
    
    const currentStatusIndex = useMemo(() => {
        if (!trackedOrder) return -1;
        return statusSteps.indexOf(trackedOrder.status);
    }, [trackedOrder]);


    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24 flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
                <h1 className="font-display text-4xl md:text-5xl font-black mb-8">Track Your Order</h1>
                <form onSubmit={handleTrackOrder} className="max-w-md mx-auto mb-8">
                    <div className="flex">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter your Order ID (e.g., LU-123456)"
                            className="w-full bg-transparent border border-[#8C6653] rounded-l-xl py-3 px-6 placeholder:text-[#8C6653]/70 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]"
                            aria-label="Order ID"
                        />
                        <button
                            type="submit"
                            className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-r-xl hover:bg-opacity-90 transition-all duration-300"
                        >
                            Track
                        </button>
                    </div>
                    {error && <p className="text-red-700 mt-2 font-bold">{error}</p>}
                </form>

                {trackedOrder && (
                    <div className="max-w-2xl mx-auto bg-white/60 p-8 rounded-2xl text-left">
                        <h2 className="text-2xl font-bold mb-4">Order Status for #{trackedOrder.orderNumber}</h2>
                        <p className="mb-8">Hi {trackedOrder.customerName}, here's the latest update on your order.</p>

                        <div className="relative">
                            {/* Progress Bar */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#E9CBA7]"></div>
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#5B2C23] transition-all duration-500"
                                style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                            ></div>
                            
                            <div className="flex justify-between relative">
                                {statusSteps.map((step, index) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${index <= currentStatusIndex ? 'bg-[#5B2C23]' : 'bg-[#E9CBA7]'}`}></div>
                                        <p className={`mt-2 text-xs font-semibold ${index <= currentStatusIndex ? 'text-[#5B2C23]' : 'text-[#8C6653]'}`}>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrderPage;