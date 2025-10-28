import React from 'react';
// FIX: Corrected import path for App.tsx
import { User, OrderDetails } from '../../../App';

interface ProfilePageProps {
    navigate: (page: string) => void;
    user: User | null;
    orderHistory: OrderDetails[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigate, user, orderHistory }) => {
    if (!user) {
        return (
            <div className="bg-[#F3E9DD] text-[#2C1B13] min-h-screen py-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg mb-6">Please log in to view your profile.</p>
                    <button
                        onClick={() => navigate('login')}
                        className="bg-[#511317] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-[#F3E9DD] text-[#2C1B13] min-h-screen py-12 md:py-24">
            <div className="container mx-auto px-6">
                <h1 className="font-display text-4xl md:text-5xl font-black mb-12 text-center">My Profile</h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left side: Account Details */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-2xl h-fit shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-bold">Name:</p>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <p className="font-bold">Email:</p>
                                <p>{user.email}</p>
                            </div>
                             <div>
                                <p className="font-bold">Address:</p>
                                {user.address.street ? (
                                    <>
                                        <p>{user.address.flat}, {user.address.street}</p>
                                        <p>{user.address.city}, {user.address.state} - {user.address.zip}</p>
                                    </>
                                ) : (
                                    <p>No address on file.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Order History */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Order History</h2>
                        {orderHistory.length > 0 ? (
                            <div className="space-y-6">
                                {orderHistory.map(order => (
                                    <div key={order.orderNumber} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-lg">Order #{order.orderNumber}</h3>
                                            <span className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex justify-between">
                                                    <span className="capitalize">{item.productName.toLowerCase()}</span>
                                                    <span>₹{item.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-300 mt-2 pt-2 text-right text-sm">
                                             <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>
                                             {order.discountAmount && order.discountAmount > 0 && (
                                                <p className="text-green-600">Discount: - ₹{order.discountAmount.toFixed(2)}</p>
                                             )}
                                             <p>Shipping: ₹{order.shippingCost.toFixed(2)}</p>
                                             {order.taxAmount > 0 && (
                                                <p>GST: ₹{order.taxAmount.toFixed(2)}</p>
                                            )}
                                            <p className="font-bold text-base mt-1">Total: ₹{order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                           <p>You haven't placed any orders yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;