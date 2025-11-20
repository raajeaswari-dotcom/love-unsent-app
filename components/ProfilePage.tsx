import React, { useState } from 'react';
import type { User, OrderDetails } from '../App';
import { OrdersIcon, MapPinIcon, UserCircleIcon, PencilIcon, TrashIcon, ArrowDownIcon } from './Icons';

interface ProfilePageProps {
    navigate: (page: string, props?: any, anchor?: string) => void;
    user: User | null;
    orderHistory: OrderDetails[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigate, user, orderHistory }) => {
    const [activeTab, setActiveTab] = useState('orders');
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    if (!user) {
        return (
            <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg mb-6">Please log in to view your profile.</p>
                    <button
                        onClick={() => navigate('login')}
                        className="bg-[#5B2C23] text-white font-bold py-3 px-8 rounded-xl hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_16px_rgba(91,44,35,0.1)]"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
    
    // Mock data for additional addresses for demonstration
    const addresses = [
        { ...user.address, type: 'Default', id: 1 },
        { id: 2, type: 'Work', flat: '5th Floor, Tech Park', street: 'Cyber City', city: 'Gurgaon', state: 'Haryana', zip: '122002' }
    ].filter(addr => addr.street); // Only show addresses that have been set

    const TabButton: React.FC<{ tabName: string; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center gap-3 w-full p-4 rounded-xl text-left font-semibold transition-colors ${
                activeTab === tabName
                    ? 'bg-white shadow-[0_4px_12px_rgba(91,44,35,0.08)] text-[#5B2C23]'
                    : 'text-[#8C6653] hover:bg-white/50'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    const renderOrders = () => (
        <div>
            <h2 className="text-3xl font-bold mb-6">My Orders</h2>
            {orderHistory.length > 0 ? (
                <div className="space-y-4">
                    {orderHistory.map(order => (
                        <div key={order.orderNumber} className="bg-white/60 border border-[#E9CBA7] rounded-xl overflow-hidden">
                            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <p className="font-bold text-lg">Order #{order.orderNumber}</p>
                                    <p className="text-sm text-[#8C6653]">Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-[#8C6653]">Total: <span className="font-bold">₹{order.total.toFixed(2)}</span></p>
                                </div>
                                <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {order.status}
                                    </span>
                                    <button onClick={() => navigate('track-order', {orderId: order.orderNumber})} className="px-3 py-1 text-xs font-semibold rounded-full bg-[#8C6653] text-white hover:bg-opacity-80">Track</button>
                                    <button
                                        onClick={() => setExpandedOrderId(expandedOrderId === order.orderNumber ? null : order.orderNumber)}
                                        className="p-1 rounded-full hover:bg-[#E9CBA7]"
                                    >
                                        <ArrowDownIcon className={`w-5 h-5 transition-transform ${expandedOrderId === order.orderNumber ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>
                            {expandedOrderId === order.orderNumber && (
                                <div className="bg-[#E9CBA7]/50 p-4 border-t border-[#E9CBA7]">
                                    <h4 className="font-bold mb-2">Items:</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                                        {order.items.map(item => <li key={item.id}>{item.productName} - ₹{item.price.toFixed(2)}</li>)}
                                    </ul>
                                    <h4 className="font-bold mb-2">Shipping To:</h4>
                                    <address className="text-sm not-italic">
                                        {order.shippingAddress.fullName}<br />
                                        {order.shippingAddress.flat}, {order.shippingAddress.street}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}
                                    </address>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>You haven't placed any orders yet.</p>
            )}
        </div>
    );

    const renderAddresses = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Addresses</h2>
                <button className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl hover:bg-opacity-90 text-sm">Add New Address</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {addresses.map(addr => (
                    <div key={addr.id} className="bg-white/60 border border-[#E9CBA7] rounded-xl p-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#E9CBA7]">{addr.type}</span>
                            <div className="flex gap-3">
                                <button className="text-blue-600 hover:text-blue-800"><PencilIcon className="w-4 h-4" /></button>
                                {addr.type !== 'Default' && <button className="text-red-600 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>}
                            </div>
                        </div>
                        <address className="text-sm not-italic">
                            {user.name}<br />
                            {addr.flat}, {addr.street}<br />
                            {addr.city}, {addr.state} - {addr.zip}
                        </address>
                    </div>
                ))}
            </div>
        </div>
    );
    
    const renderAccountDetails = () => (
        <div>
            <h2 className="text-3xl font-bold mb-6">Account Details</h2>
            <div className="bg-white/60 border border-[#E9CBA7] rounded-xl p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Personal Information</h3>
                    <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
                        <PencilIcon className="w-4 h-4" /> Edit
                    </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div><p className="text-sm text-[#8C6653]">Full Name</p><p className="font-semibold">{user.name}</p></div>
                    <div><p className="text-sm text-[#8C6653]">Email Address</p><p className="font-semibold">{user.email}</p></div>
                    <div><p className="text-sm text-[#8C6653]">Phone Number</p><p className="font-semibold">{user.mobile || 'Not provided'}</p></div>
                </div>
            </div>

            <div className="bg-white/60 border border-[#E9CBA7] rounded-xl p-8">
                <h3 className="font-bold text-xl mb-6">Change Password</h3>
                <form className="space-y-4 max-w-sm">
                    <div>
                        <label className="text-sm font-semibold">Current Password</label>
                        <input type="password" className="w-full bg-transparent border border-[#8C6653] rounded-xl py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">New Password</label>
                        <input type="password" className="w-full bg-transparent border border-[#8C6653] rounded-xl py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Confirm New Password</label>
                        <input type="password" className="w-full bg-transparent border border-[#8C6653] rounded-xl py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" />
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl hover:bg-opacity-90">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    );


    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen py-12 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h1 className="font-display text-4xl md:text-5xl font-black">Welcome, {user.name.split(' ')[0]}!</h1>
                     <p className="text-[#8C6653] mt-2">Manage your orders, addresses, and personal details.</p>
                </div>
                <div className="grid lg:grid-cols-4 gap-8 items-start">
                    <aside className="lg:col-span-1 bg-[#E9CBA7]/50 p-4 rounded-2xl lg:sticky top-40 space-y-2">
                        <TabButton tabName="orders" label="My Orders" icon={<OrdersIcon className="w-5 h-5" />} />
                        <TabButton tabName="addresses" label="My Addresses" icon={<MapPinIcon className="w-5 h-5" />} />
                        <TabButton tabName="details" label="Account Details" icon={<UserCircleIcon className="w-5 h-5" />} />
                    </aside>

                    <main className="lg:col-span-3">
                        {activeTab === 'orders' && renderOrders()}
                        {activeTab === 'addresses' && renderAddresses()}
                        {activeTab === 'details' && renderAccountDetails()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;