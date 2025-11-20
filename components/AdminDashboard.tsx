

import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
// FIX: Corrected import path for App.tsx
import type { OrderDetails, Product, User, Transaction, PaymentMethod, TaxSettings, Shipment, Coupon, StoreSettings, Writer, Testimonial, Occasion, ProductAttributeOption, PaperType } from '../App';
import { getAdminAuthHeader } from '../utils/adminAuth';
import { mainCategories } from '../data/category-mapping.js';
import { DashboardIcon, OrdersIcon, ProductsIcon, CustomersIcon, PencilIcon, TrashIcon, EyeIcon, SparklesIcon, CloseIcon, SortIcon, ArrowDownIcon, SearchIcon, SettingsIcon, PlusIcon, ShippingIcon, MarketingIcon, ReportsIcon, PrintIcon, WritersIcon, TestimonialsIcon, GiftIcon, ImageIcon } from './Icons';

// Add Shipping-specific types
export interface ShippingZone { id: number; name: string; states: string[]; }
export interface ShippingRate { id: number; zoneId: number; rate: number; method: 'Standard' | 'Express'; deliveryTime: string; }
export interface ServiceablePincode { pincode: string; city: string; state: string; }

interface AdminDashboardProps {
    occasions: Occasion[];
    setOccasions: React.Dispatch<React.SetStateAction<Occasion[]>>;
    paperTypes: PaperType[];
    setPaperTypes: React.Dispatch<React.SetStateAction<PaperType[]>>;
}


const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-white/60 p-6 rounded-xl shadow-[0_4px_12px_rgba(91,44,35,0.08)]">
        <h3 className="text-sm font-semibold text-[#8C6653] uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold mt-1 text-[#5B2C23]">{value}</p>
    </div>
);

const SalesChart: React.FC<{ orders: OrderDetails[] }> = ({ orders }) => {
    const salesByDay = useMemo(() => {
        if (!orders || orders.length === 0) return [];
        const dailyTotals: { [key: string]: number } = {};
        orders.forEach(order => {
            const date = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (!dailyTotals[date]) { dailyTotals[date] = 0; }
            dailyTotals[date] += order.total;
        });
        return Object.entries(dailyTotals).map(([date, total]) => ({ date, total })).slice(-7).reverse();
    }, [orders]);

    if (salesByDay.length === 0) { return (<div className="h-80 bg-black/5 rounded-lg flex items-center justify-center"><p className="text-[#8C6653]">No sales data available.</p></div>); }

    const maxSale = Math.max(...salesByDay.map(d => d.total), 0);
    const chartHeight = 320;
    const barWidth = 40;
    const gapWidth = 20;

    return (
        <div className="w-full overflow-x-auto"><svg width={salesByDay.length * (barWidth + gapWidth)} height={chartHeight} className="font-sans"><g>{salesByDay.map((day, index) => { const barHeight = maxSale > 0 ? (day.total / maxSale) * (chartHeight - 40) : 0; const x = index * (barWidth + gapWidth); const y = chartHeight - barHeight - 20; return (<g key={day.date}><rect x={x} y={y} width={barWidth} height={barHeight} fill="#5B2C23" rx="4" ry="4" /><text x={x + barWidth / 2} y={chartHeight - 5} textAnchor="middle" fontSize="12" fill="#5B2C23">{day.date}</text><text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="12" fill="#8C6653" fontWeight="bold">₹{day.total.toFixed(0)}</text></g>); })}</g></svg></div>
    );
};


const AdminDashboard: React.FC<AdminDashboardProps> = ({ occasions, setOccasions, paperTypes, setPaperTypes }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // All dashboard state is now managed here
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<User[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [taxSettings, setTaxSettings] = useState<TaxSettings>({ rate: 18, included: false });
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [storeSettings, setStoreSettings] = useState<StoreSettings>({ storeName: '', address: '', gstin: '', contactEmail: '', shipping: { flatRate: 0, freeShippingThreshold: 0 }});
    const [writers, setWriters] = useState<Writer[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [serviceablePincodes, setServiceablePincodes] = useState<ServiceablePincode[]>([]);
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const res = await fetch('https://love-unsent-app-final-backend.onrender.com/api/admin/dashboard-data', {
                    headers: getAdminAuthHeader(),
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch dashboard data. Please log in again.');
                }
                const data = await res.json();
                setOrders(data.orders || []);
                setProducts(data.products || []);
                setCustomers(data.customers || []);
                setTransactions(data.transactions || []);
                setPaymentMethods(data.paymentMethods || []);
                setTaxSettings(data.taxSettings);
                setShipments(data.shipments || []);
                setCoupons(data.coupons || []);
                setStoreSettings(data.storeSettings);
                setWriters(data.writers || []);
                setTestimonials(data.testimonials || []);
                setShippingZones(data.shippingZones || []);
                setShippingRates(data.shippingRates || []);
                setServiceablePincodes(data.serviceablePincodes || []);
                setOccasions(data.occasions || []);
                setPaperTypes(data.paperTypes || []);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [setOccasions, setPaperTypes]);

    // Modals
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
    const [editingCustomer, setEditingCustomer] = useState<User | null>(null);
    const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [editingWriter, setEditingWriter] = useState<Writer | null>(null);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<{ [key: string]: boolean }>({});
    const [invoiceOrder, setInvoiceOrder] = useState<OrderDetails | null>(null);
    const [editingShippingZone, setEditingShippingZone] = useState<ShippingZone | null>(null);
    const [editingShippingRate, setEditingShippingRate] = useState<ShippingRate | null>(null);
    const [editingOccasion, setEditingOccasion] = useState<Occasion | null>(null);
    const [editingPaperType, setEditingPaperType] = useState<PaperType | null>(null);


    const openModal = (modalName: string, data?: any) => {
        if (data) {
            if (modalName === 'product') setEditingProduct(data);
            if (modalName === 'order') setSelectedOrder(data);
            if (modalName === 'customerDetails') setSelectedCustomer(data);
            if (modalName === 'customerEdit') setEditingCustomer(data);
            if (modalName === 'paymentMethod') setEditingPaymentMethod(data);
            if (modalName === 'shipment') setEditingShipment(data);
            if (modalName === 'coupon') setEditingCoupon(data);
            if (modalName === 'writer') setEditingWriter(data);
            if (modalName === 'testimonial') setEditingTestimonial(data);
            if (modalName === 'invoice') setInvoiceOrder(data);
            if (modalName === 'shippingZone') setEditingShippingZone(data);
            if (modalName === 'shippingRate') setEditingShippingRate(data);
            if (modalName === 'occasion') setEditingOccasion(data);
            if (modalName === 'paperType') setEditingPaperType(data);
        }
        setIsModalOpen(prev => ({ ...prev, [modalName]: true }));
    };

    const closeModal = (modalName: string) => {
        setIsModalOpen(prev => ({ ...prev, [modalName]: false }));
        setEditingProduct(null); setSelectedOrder(null); setSelectedCustomer(null);
        setEditingCustomer(null); setEditingPaymentMethod(null); setEditingShipment(null);
        setEditingCoupon(null); setEditingWriter(null); setEditingTestimonial(null); setInvoiceOrder(null);
        setEditingShippingZone(null); setEditingShippingRate(null); setEditingOccasion(null); setEditingPaperType(null);
    };

    const [orderSearchTerm, setOrderSearchTerm] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState<OrderDetails['status'] | 'All'>('All');
    const [orderSortConfig, setOrderSortConfig] = useState<{ key: keyof OrderDetails | null; direction: string }>({ key: 'date', direction: 'descending' });
    const [customerSearchTerm, setCustomerSearchTerm] = useState('');
    const [customerSortConfig, setCustomerSortConfig] = useState<{ key: keyof User | 'city' | null; direction: string }>({ key: 'joinedDate', direction: 'descending' });
    const [shipmentSearchTerm, setShipmentSearchTerm] = useState('');
    const [shipmentStatusFilter, setShipmentStatusFilter] = useState<Shipment['status'] | 'All'>('All');
    const [shipmentSortConfig, setShipmentSortConfig] = useState<{ key: keyof Shipment | null; direction: string }>({ key: 'shippingDate', direction: 'descending' });


    const filteredAndSortedOrders = useMemo(() => { let sorted = [...orders]; if (orderStatusFilter !== 'All') { sorted = sorted.filter(o => o.status === orderStatusFilter); } if (orderSearchTerm) { sorted = sorted.filter(o => o.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase()) || o.customerName.toLowerCase().includes(orderSearchTerm.toLowerCase())); } if (orderSortConfig.key) { const key = orderSortConfig.key; sorted.sort((a, b) => { const aVal = a[key], bVal = b[key]; if (aVal < bVal) return orderSortConfig.direction === 'ascending' ? -1 : 1; if (aVal > bVal) return orderSortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sorted; }, [orders, orderSearchTerm, orderStatusFilter, orderSortConfig]);
    const filteredAndSortedCustomers = useMemo(() => { let sorted = [...customers]; if (customerSearchTerm) { sorted = sorted.filter(c => c.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) || c.email.toLowerCase().includes(customerSearchTerm.toLowerCase())); } if (customerSortConfig.key) { const key = customerSortConfig.key; sorted.sort((a, b) => { let aVal: any, bVal: any; if (key === 'city') { aVal = a.address.city; bVal = b.address.city; } else { aVal = a[key as keyof User]; bVal = b[key as keyof User]; } if (aVal < bVal) return customerSortConfig.direction === 'ascending' ? -1 : 1; if (aVal > bVal) return customerSortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sorted; }, [customers, customerSearchTerm, customerSortConfig]);
    const filteredAndSortedShipments = useMemo(() => { let sorted = [...shipments]; if (shipmentStatusFilter !== 'All') { sorted = sorted.filter(s => s.status === shipmentStatusFilter); } if (shipmentSearchTerm) { sorted = sorted.filter(s => s.orderNumber.toLowerCase().includes(shipmentSearchTerm.toLowerCase()) || s.customerName.toLowerCase().includes(shipmentSearchTerm.toLowerCase()) || s.trackingNumber.toLowerCase().includes(shipmentSearchTerm.toLowerCase())); } if (shipmentSortConfig.key) { const key = shipmentSortConfig.key; sorted.sort((a, b) => { const aVal = a[key], bVal = b[key]; if (aVal === null) return 1; if (bVal === null) return -1; if (aVal < bVal) return shipmentSortConfig.direction === 'ascending' ? -1 : 1; if (aVal > bVal) return shipmentSortConfig.direction === 'ascending' ? 1 : -1; return 0; }); } return sorted; }, [shipments, shipmentSearchTerm, shipmentStatusFilter, shipmentSortConfig]);


    const requestSort = (key: any, config: any, setConfig: any) => { setConfig((prev: any) => ({ key, direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending' })); };
    const handleDelete = (id: number, items: any[], setItems: (items: any[]) => void, itemName: string) => { if (window.confirm(`Are you sure you want to delete this ${itemName}?`)) { setItems(items.filter(item => item.id !== id)); } };
    
    const handleSaveProduct = (data: Product) => { if (data.id) { setProducts(products.map(p => p.id === data.id ? data : p)); } else { setProducts([...products, { ...data, id: Date.now() }]); } closeModal('product'); };
    const handleOrderStatusChange = (orderNumber: string, newStatus: OrderDetails['status']) => { setOrders(orders.map(o => o.orderNumber === orderNumber ? { ...o, status: newStatus } : o)); if (newStatus === 'Shipped' && !shipments.some(s => s.orderNumber === orderNumber)) { const order = orders.find(o => o.orderNumber === orderNumber); if (order) { setShipments(prev => [{ shipmentId: `SH-${Date.now().toString().slice(-6)}`, orderNumber: order.orderNumber, customerName: order.customerName, shippingDate: null, carrier: '', trackingNumber: '', status: 'Pending' }, ...prev]); } } };
    const handleSaveCustomer = (data: User) => { if (data.id) { setCustomers(customers.map(c => c.id === data.id ? data : c)); } else { setCustomers([...customers, { ...data, id: Date.now() }]); } closeModal('customerEdit'); };
    const handleSaveShipment = (data: Shipment) => { setShipments(shipments.map(s => s.shipmentId === data.shipmentId ? data : s)); closeModal('shipment'); };
    const handleShipmentStatusChange = (shipmentId: string, newStatus: Shipment['status']) => { setShipments(shipments.map(s => s.shipmentId === shipmentId ? { ...s, status: newStatus } : s)); };
    const handleSavePaymentMethod = (data: PaymentMethod) => { if (data.id) { setPaymentMethods(paymentMethods.map(pm => pm.id === data.id ? { ...pm, name: data.name } : pm)); } else { setPaymentMethods([...paymentMethods, { ...data, id: Date.now(), enabled: true }]); } closeModal('paymentMethod'); };
    const handleSaveCoupon = (data: Coupon) => { if (data.id) { setCoupons(coupons.map(c => c.id === data.id ? data : c)); } else { setCoupons([...coupons, { ...data, id: Date.now() }]); } closeModal('coupon'); };
    const handleSaveWriter = (data: Writer) => { if (data.id) { setWriters(writers.map(w => w.id === data.id ? data : w)); } else { setWriters([...writers, { ...data, id: Date.now() }]); } closeModal('writer'); };
    const handleAssignWriter = (orderNumber: string, writerId: number) => { setOrders(orders.map(o => o.orderNumber === orderNumber ? { ...o, writerId: writerId } : o)); };
    
    const handleSaveTestimonial = async (testimonial: Testimonial) => {
        const method = testimonial.id ? 'PUT' : 'POST';
        const url = `https://love-unsent-app-final-backend.onrender.com/api/testimonials${testimonial.id ? `/${testimonial.id}` : ''}`;

        
        try {
            const res = await fetch(url, {
                method,
                headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify(testimonial),
            });
            if (!res.ok) throw new Error('Failed to save testimonial');
            const savedTestimonial = await res.json();
            if (testimonial.id) {
                setTestimonials(testimonials.map(t => t.id === savedTestimonial.id ? savedTestimonial : t));
            } else {
                setTestimonials([...testimonials, savedTestimonial]);
            }
            closeModal('testimonial');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTestimonial = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const res = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/testimonials/${id}`, {

                    method: 'DELETE',
                    headers: getAdminAuthHeader(),
                });
                if (!res.ok) throw new Error('Failed to delete testimonial');
                setTestimonials(testimonials.filter(t => t.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSaveOccasion = async (occasion: Omit<Occasion, 'id'> & { id?: number }) => {
        const method = occasion.id ? 'PUT' : 'POST';
        const url = `https://love-unsent-app-final-backend.onrender.com/api/occasions${occasion.id ? `/${occasion.id}` : ''}`;

        
        try {
            const res = await fetch(url, {
                method,
                headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify(occasion),
            });
            if (!res.ok) throw new Error('Failed to save occasion');
            const savedOccasion = await res.json();
            if (occasion.id) {
                setOccasions(occasions.map(o => o.id === savedOccasion.id ? savedOccasion : o));
            } else {
                setOccasions([...occasions, savedOccasion]);
            }
            closeModal('occasion');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteOccasion = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this occasion?')) {
            try {
                const res = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/occasions/${id}`, {

                    method: 'DELETE',
                    headers: getAdminAuthHeader(),
                });
                if (!res.ok) throw new Error('Failed to delete occasion');
                setOccasions(occasions.filter(o => o.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };
    
    const handleSavePaperType = async (paperType: Omit<PaperType, 'id'> & { id?: number }) => {
        const method = paperType.id ? 'PUT' : 'POST';
        const url = `https://love-unsent-app-final-backend.onrender.com/api/papertypes${paperType.id ? `/${paperType.id}` : ''}`;

        try {
            const res = await fetch(url, {
                method,
                headers: { ...getAdminAuthHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify(paperType),
            });
            if (!res.ok) throw new Error('Failed to save paper type');
            const savedPaperType = await res.json();
            if (paperType.id) {
                setPaperTypes(paperTypes.map(p => p.id === savedPaperType.id ? savedPaperType : p));
            } else {
                setPaperTypes([...paperTypes, savedPaperType]);
            }
            closeModal('paperType');
        } catch (err) {
            console.error(err);
            alert('Failed to save paper type. See console for details.');
        }
    };

    const handleDeletePaperType = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this paper type?')) {
            try {
                const res = await fetch(`https://love-unsent-app-final-backend.onrender.com/api/papertypes/${id}`, {

                    method: 'DELETE',
                    headers: getAdminAuthHeader(),
                });
                if (!res.ok) throw new Error('Failed to delete paper type');
                setPaperTypes(paperTypes.filter(p => p.id !== id));
            } catch (err) {
                console.error(err);
                alert('Failed to delete paper type. See console for details.');
            }
        }
    };

    const SortableHeader: React.FC<{ label: string; sortKey: any; config: any; setConfig: any; className?: string }> = ({ label, sortKey, config, setConfig, className = '' }) => (<th className={`p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase tracking-wider cursor-pointer select-none ${className}`} onClick={() => requestSort(sortKey, config, setConfig)}><div className="flex items-center gap-1.5">{label}{config.key === sortKey ? (<ArrowDownIcon className={`w-4 h-4 transition-transform ${config.direction === 'ascending' ? 'transform rotate-180' : ''}`} />) : (<SortIcon className="w-4 h-4 text-gray-400" />)}</div></th>);
    const orderStatusColors: { [key in OrderDetails['status']]: string } = { Processing: 'bg-yellow-100 text-yellow-800', Writing: 'bg-indigo-100 text-indigo-800', Packaged: 'bg-purple-100 text-purple-800', Shipped: 'bg-blue-100 text-blue-800', Delivered: 'bg-green-100 text-green-800', Cancelled: 'bg-red-100 text-red-800' };
    const shipmentStatusColors: { [key in Shipment['status']]: string } = { Pending: 'bg-gray-100 text-gray-800', Shipped: 'bg-blue-100 text-blue-800', 'In Transit': 'bg-indigo-100 text-indigo-800', 'Out for Delivery': 'bg-purple-100 text-purple-800', Delivered: 'bg-green-100 text-green-800', 'Failed Attempt': 'bg-red-100 text-red-800' };
    const summaryStats = useMemo(() => { const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0); return { totalRevenue: `₹${totalRevenue.toFixed(2)}`, totalOrders: orders.length.toString(), avgOrderValue: `₹${(orders.length > 0 ? totalRevenue / orders.length : 0).toFixed(2)}`, conversionRate: "2.5%" }; }, [orders]);
    const topSellingProducts = useMemo(() => { const sales: { [key: string]: number } = {}; orders.forEach(order => { order.items.forEach(item => { if (!sales[item.productName]) sales[item.productName] = 0; sales[item.productName]++; }); }); return Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 5); }, [orders]);
    const recentActivities = useMemo(() => { const combined = [...orders.map(o => ({ type: 'order', data: o, date: new Date(o.date) })), ...customers.map(c => ({ type: 'customer', data: c, date: new Date(c.joinedDate) }))]; return combined.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5); }, [orders, customers]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-96"><p>Loading Dashboard...</p></div>;
    }
    if (error) {
        return <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">{error}</div>
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><StatCard title="Total Revenue" value={summaryStats.totalRevenue} /><StatCard title="Total Orders" value={summaryStats.totalOrders} /><StatCard title="Avg. Order Value" value={summaryStats.avgOrderValue} /><StatCard title="Conversion Rate" value={summaryStats.conversionRate} /></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><h2 className="text-2xl font-bold mb-6 text-[#5B2C23]">Recent Sales</h2><SalesChart orders={orders} /></div><div className="space-y-6"><div className="bg-white/60 p-6 rounded-xl shadow-[0_4px_12px_rgba(91,44,35,0.08)]"><h3 className="text-lg font-bold mb-4 text-[#5B2C23]">Top Selling Products</h3><ul className="space-y-2">{topSellingProducts.map(([name, count]) => (<li key={name} className="flex justify-between text-sm text-[#5B2C23]"><span>{name}</span><span className="font-bold">{count} sales</span></li>))}</ul></div><div className="bg-white/60 p-6 rounded-xl shadow-[0_4px_12px_rgba(91,44,35,0.08)]"><h3 className="text-lg font-bold mb-4 text-[#5B2C23]">Recent Activity</h3><ul className="space-y-3">{recentActivities.map((act, i) => (<li key={i} className="text-sm text-[#5B2C23]">{act.type === 'order' ? `New order #${(act.data as OrderDetails).orderNumber} from ${(act.data as OrderDetails).customerName}` : `New customer: ${(act.data as User).name}`}</li>))}</ul></div></div></div>
                </div>);
            case 'orders': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><h2 className="text-2xl font-bold text-[#5B2C23]">Manage Orders</h2><div className="relative w-full md:w-auto"><input type="text" placeholder="Search..." value={orderSearchTerm} onChange={(e) => setOrderSearchTerm(e.target.value)} className="w-full md:w-64 bg-black/5 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5B2C23]" /><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="w-5 h-5 text-gray-400" /></div></div></div><div className="flex gap-2 mb-4 flex-wrap">{(['All', 'Processing', 'Writing', 'Packaged', 'Shipped', 'Delivered', 'Cancelled'] as const).map(s => (<button key={s} onClick={() => setOrderStatusFilter(s)} className={`px-4 py-1.5 text-sm font-semibold rounded-full ${orderStatusFilter === s ? 'bg-[#5B2C23] text-white' : 'bg-[#E9CBA7]/50 text-[#5B2C23]'}`}>{s}</button>))}</div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><SortableHeader label="Order ID" sortKey="orderNumber" config={orderSortConfig} setConfig={setOrderSortConfig} /><SortableHeader label="Date" sortKey="date" config={orderSortConfig} setConfig={setOrderSortConfig} /><SortableHeader label="Customer" sortKey="customerName" config={orderSortConfig} setConfig={setOrderSortConfig} /><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Writer</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Status</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody className="text-[#5B2C23]">{filteredAndSortedOrders.map(o => (<tr key={o.orderNumber} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 font-mono text-sm">{o.orderNumber}</td><td className="p-4">{new Date(o.date).toLocaleDateString()}</td><td className="p-4">{o.customerName}</td><td className="p-4">{writers.find(w => w.id === o.writerId)?.name || 'Unassigned'}</td><td className="p-4"><select value={o.status} onChange={(e) => handleOrderStatusChange(o.orderNumber, e.target.value as OrderDetails['status'])} className={`px-2 py-1 text-xs font-semibold rounded-full border-none focus:ring-2 focus:ring-[#5B2C23] ${orderStatusColors[o.status]}`}><option value="Processing">Processing</option><option value="Writing">Writing</option><option value="Packaged">Packaged</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option></select></td><td className="p-4 flex gap-3"><button onClick={() => openModal('order', o)} className="text-gray-600 hover:text-[#5B2C23]"><EyeIcon /></button><button onClick={() => openModal('invoice', o)} className="text-gray-600 hover:text-blue-600"><PrintIcon className="w-5 h-5"/></button></td></tr>))}</tbody></table></div></div>);
            case 'products': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Manage Products</h2><button onClick={() => openModal('product')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl hover:bg-opacity-90">Add New Product</button></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Product</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Price</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Stock</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">GST</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{products.map(p => (<tr key={p.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 flex items-center gap-4"><img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-md" /><span className="font-semibold">{p.name}</span></td><td className="p-4 font-bold">₹{p.price.toFixed(2)}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</span></td><td className="p-4">{p.gstRate || 0}%</td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('product', p)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDelete(p.id, products, setProducts, 'product')} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'customers': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Customers</h2><div className="flex items-center gap-4"><div className="relative"><input type="text" placeholder="Search..." value={customerSearchTerm} onChange={(e) => setCustomerSearchTerm(e.target.value)} className="w-64 bg-black/5 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#5B2C23]" /><div className="absolute inset-y-0 left-0 pl-3 flex items-center"><SearchIcon className="w-5 h-5 text-gray-400" /></div></div><button onClick={() => openModal('customerEdit')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl">Add Customer</button></div></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><SortableHeader label="Name" sortKey="name" config={customerSortConfig} setConfig={setCustomerSortConfig} /><SortableHeader label="Email" sortKey="email" config={customerSortConfig} setConfig={setCustomerSortConfig} /><SortableHeader label="City" sortKey="city" config={customerSortConfig} setConfig={setCustomerSortConfig} /><SortableHeader label="Joined" sortKey="joinedDate" config={customerSortConfig} setConfig={setCustomerSortConfig} /><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{filteredAndSortedCustomers.map(c => (<tr key={c.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 font-semibold">{c.name}</td><td className="p-4">{c.email}</td><td className="p-4">{c.address.city}</td><td className="p-4">{c.joinedDate}</td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('customerDetails', c)}><EyeIcon /></button><button onClick={() => openModal('customerEdit', c)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDelete(c.id, customers, setCustomers, 'customer')} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'writers': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Writers</h2><button onClick={() => openModal('writer')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add Writer</button></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Name</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Specialty</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Assigned Orders</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Status</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{writers.map(w => (<tr key={w.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 font-semibold">{w.name}</td><td className="p-4">{w.specialty}</td><td className="p-4">{w.assignedOrders}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${w.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{w.status}</span></td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('writer', w)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDelete(w.id, writers, setWriters, 'writer')} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'marketing': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Discount Coupons</h2><button onClick={() => openModal('coupon')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> New Coupon</button></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Code</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Type</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Value</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Status</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{coupons.map(c => (<tr key={c.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 font-mono font-bold">{c.code}</td><td className="p-4 capitalize">{c.type}</td><td className="p-4">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value.toFixed(2)}`}</td><td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{c.isActive ? 'Active' : 'Inactive'}</span></td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('coupon', c)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDelete(c.id, coupons, setCoupons, 'coupon')} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'testimonials': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Testimonials</h2><button onClick={() => openModal('testimonial')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add Testimonial</button></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase w-3/5">Quote</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Author</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{testimonials.map(t => (<tr key={t.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 italic">"{t.quote.substring(0, 80)}..."</td><td className="p-4 font-semibold">{t.author}</td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('testimonial', t)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDeleteTestimonial(t.id)} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'occasions': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-[#5B2C23]">Occasions</h2><button onClick={() => openModal('occasion')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add Occasion</button></div><div className="overflow-x-auto"><table className="w-full text-[#5B2C23]"><thead className="bg-black/5"><tr className="border-b-2 border-[#E9CBA7]"><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase w-2/5">Name</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Category</th><th className="p-4 text-left text-xs font-semibold text-[#5B2C23] uppercase">Actions</th></tr></thead><tbody>{occasions.map(o => (<tr key={o.id} className="border-b border-[#E9CBA7] hover:bg-black/5"><td className="p-4 font-semibold">{o.name}</td><td className="p-4">{o.category}</td><td className="p-4"><div className="flex gap-4"><button onClick={() => openModal('occasion', o)} className="text-blue-600"><PencilIcon /></button><button onClick={() => handleDeleteOccasion(o.id)} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>);
            case 'paperTypes': return (<PaperTypesManagement paperTypes={paperTypes} onSave={handleSavePaperType} onDelete={handleDeletePaperType} openModal={(p: PaperType) => openModal('paperType', p)} />);
            case 'shipping': return (<ShippingManagement zones={shippingZones} setZones={setShippingZones} rates={shippingRates} setRates={setShippingRates} pincodes={serviceablePincodes} setPincodes={setServiceablePincodes} openZoneModal={ (z: any) => openModal('shippingZone', z) } openRateModal={ (r: any) => openModal('shippingRate', r) } />);
            case 'reports': return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]"><h2 className="text-2xl font-bold text-[#5B2C23]">Reports</h2><p className="mt-4 text-gray-700">Advanced reporting and analytics module coming soon!</p></div>);
            case 'settings': return (<SettingsPage storeSettings={storeSettings} setStoreSettings={setStoreSettings} paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods} openModal={openModal} />);
            default: return null;
        }
    };
    
    const NavItem: React.FC<{ tabName: string; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (<button onClick={() => setActiveTab(tabName)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold ${activeTab === tabName ? 'bg-white/80 text-[#5B2C23] shadow-sm' : 'text-[#5B2C23] hover:bg-white/50'}`}>{icon}{label}</button>);

    return (
        <div className="bg-[#F5EADF] text-[#5B2C23] min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <h1 className="font-display text-4xl md:text-5xl font-black mb-8 text-[#5B2C23]">Admin Dashboard</h1>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <aside className="w-full md:w-64 bg-[#E9CBA7]/50 p-4 rounded-2xl shadow-[0_4px_12px_rgba(91,44,35,0.08)] shrink-0">
                        <nav className="space-y-2">
                            <NavItem tabName="dashboard" icon={<DashboardIcon className="w-5 h-5"/>} label="Dashboard" />
                            <NavItem tabName="orders" icon={<OrdersIcon className="w-5 h-5"/>} label="Orders" />
                            <NavItem tabName="products" icon={<ProductsIcon className="w-5 h-5"/>} label="Products" />
                            <NavItem tabName="customers" icon={<CustomersIcon className="w-5 h-5"/>} label="Customers" />
                             <NavItem tabName="occasions" icon={<GiftIcon className="w-5 h-5"/>} label="Occasions" />
                             <NavItem tabName="paperTypes" icon={<ImageIcon className="w-5 h-5"/>} label="Paper Types" />
                            <NavItem tabName="writers" icon={<WritersIcon className="w-5 h-5"/>} label="Writers" />
                            <NavItem tabName="marketing" icon={<MarketingIcon className="w-5 h-5"/>} label="Marketing" />
                            <NavItem tabName="testimonials" icon={<TestimonialsIcon className="w-5 h-5"/>} label="Testimonials" />
                            <NavItem tabName="shipping" icon={<ShippingIcon className="w-5 h-5"/>} label="Shipping" />
                            <NavItem tabName="reports" icon={<ReportsIcon className="w-5 h-5"/>} label="Reports" />
                            <div className="pt-4 mt-4 border-t border-[#8C6653]/30"><NavItem tabName="settings" icon={<SettingsIcon className="w-5 h-5"/>} label="Settings" /></div>
                        </nav>
                    </aside>
                    <main className="flex-1">{renderContent()}</main>
                </div>
            </div>
            {isModalOpen.product && <ProductModal product={editingProduct} onSave={handleSaveProduct} onClose={() => closeModal('product')} paperTypes={paperTypes} />}
            {isModalOpen.order && selectedOrder && <OrderDetailsModal order={selectedOrder} writers={writers} onAssignWriter={handleAssignWriter} onClose={() => closeModal('order')} />}
            {isModalOpen.customerDetails && selectedCustomer && <CustomerDetailsModal customer={selectedCustomer} onClose={() => closeModal('customerDetails')} />}
            {isModalOpen.customerEdit && <CustomerEditModal customer={editingCustomer} onSave={handleSaveCustomer} onClose={() => closeModal('customerEdit')} />}
            {isModalOpen.paymentMethod && <PaymentMethodModal method={editingPaymentMethod} onSave={handleSavePaymentMethod} onClose={() => closeModal('paymentMethod')} />}
            {isModalOpen.shipment && editingShipment && <ShipmentModal shipment={editingShipment} onSave={handleSaveShipment} onClose={() => closeModal('shipment')} />}
            {isModalOpen.coupon && <CouponModal coupon={editingCoupon} onSave={handleSaveCoupon} onClose={() => closeModal('coupon')} />}
            {isModalOpen.writer && <WriterModal writer={editingWriter} onSave={handleSaveWriter} onClose={() => closeModal('writer')} />}
            {isModalOpen.testimonial && <TestimonialModal testimonial={editingTestimonial} onSave={handleSaveTestimonial} onClose={() => closeModal('testimonial')} />}
            {isModalOpen.occasion && <OccasionModal occasion={editingOccasion} onSave={handleSaveOccasion} onClose={() => closeModal('occasion')} />}
            {isModalOpen.paperType && <PaperTypeModal paperType={editingPaperType} onSave={handleSavePaperType} onClose={() => closeModal('paperType')} />}
            {isModalOpen.invoice && invoiceOrder && <InvoiceModal order={invoiceOrder} storeSettings={storeSettings} onClose={() => closeModal('invoice')} />}
            {isModalOpen.shippingZone && <ShippingZoneModal zone={editingShippingZone} onSave={(z: any) => { if (z.id) { setShippingZones(shippingZones.map(sz => sz.id === z.id ? z : sz)); } else { setShippingZones([...shippingZones, { ...z, id: Date.now() }]); } closeModal('shippingZone'); }} onClose={() => closeModal('shippingZone')} />}
            {isModalOpen.shippingRate && <ShippingRateModal rate={editingShippingRate} zones={shippingZones} onSave={(r: any) => { if (r.id) { setShippingRates(shippingRates.map(sr => sr.id === r.id ? r : sr)); } else { setShippingRates([...shippingRates, { ...r, id: Date.now() }]); } closeModal('shippingRate'); }} onClose={() => closeModal('shippingRate')} />}
        </div>
    );
};

const PaperTypesManagement: React.FC<{ paperTypes: PaperType[], onSave: any, onDelete: (id: number) => void, openModal: (p?: PaperType) => void }> = ({ paperTypes, onDelete, openModal }) => {
    return (
        <div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#5B2C23]">Manage Paper Types</h2>
                <button onClick={() => openModal()} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2">
                    <PlusIcon /> Add Paper Type
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-[#5B2C23]">
                    <thead className="bg-black/5">
                        <tr className="border-b-2 border-[#E9CBA7]">
                            <th className="p-4 text-left text-xs font-semibold uppercase w-1/4">Paper</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase w-1/2">Description</th>
                            <th className="p-4 text-left text-xs font-semibold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paperTypes.map(p => (
                            <tr key={p.id} className="border-b border-[#E9CBA7] hover:bg-black/5">
                                <td className="p-4 flex items-center gap-4">
                                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                                    <span className="font-semibold">{p.name}</span>
                                </td>
                                <td className="p-4 text-sm">{p.description}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button onClick={() => openModal(p)} className="text-blue-600"><PencilIcon /></button>
                                        <button onClick={() => onDelete(p.id)} className="text-red-600"><TrashIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PaperTypeModal: React.FC<{ paperType: PaperType | null; onSave: (data: Omit<PaperType, 'id'> & { id?: number }) => void; onClose: () => void; }> = ({ paperType, onSave, onClose }) => {
    const [formData, setFormData] = useState(paperType || { name: '', description: '', imageUrl: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: paperType?.id });
    };
    return (
        <Modal title={paperType ? 'Edit Paper Type' : 'Add Paper Type'} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Paper Name" required className="w-full bg-black/5 rounded-md p-2" />
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required className="w-full bg-black/5 rounded-md p-2" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} required className="w-full bg-black/5 rounded-md p-2"></textarea>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button>
                    <button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button>
                </div>
            </form>
        </Modal>
    );
};


const ShippingManagement: React.FC<{ zones: ShippingZone[], setZones: any, rates: ShippingRate[], setRates: any, pincodes: ServiceablePincode[], setPincodes: any, openZoneModal: (z?: ShippingZone) => void, openRateModal: (r?: ShippingRate) => void }> = ({ zones, setZones, rates, setRates, pincodes, setPincodes, openZoneModal, openRateModal }) => {
    const [activeShippingTab, setActiveShippingTab] = useState('pincodes');
    const [pincodeSearch, setPincodeSearch] = useState('');
    const filteredPincodes = useMemo(() => pincodes.filter(p => p.pincode.includes(pincodeSearch) || p.city.toLowerCase().includes(pincodeSearch.toLowerCase())), [pincodes, pincodeSearch]);

    const handlePincodeDelete = (pincode: string) => { if (window.confirm(`Delete pincode ${pincode}?`)) { setPincodes(pincodes.filter(p => p.pincode !== pincode)); } };
    const handleAddPincode = () => { const newPincode = prompt("Enter new pincode, city, state (e.g., 122001,Gurgaon,Haryana)"); if (newPincode) { const [p, c, s] = newPincode.split(','); if (p && c && s) setPincodes([...pincodes, { pincode: p.trim(), city: c.trim(), state: s.trim() }]); } };

    return (<div className="bg-white/60 p-8 rounded-2xl shadow-[0_8px_16px_rgba(91,44,35,0.08)] text-[#5B2C23]"><h2 className="text-2xl font-bold mb-6">Shipping Management</h2><div className="flex border-b border-[#E9CBA7] mb-6"><button onClick={() => setActiveShippingTab('pincodes')} className={`px-4 py-2 font-semibold ${activeShippingTab === 'pincodes' ? 'border-b-2 border-[#5B2C23]' : ''}`}>Serviceable Pincodes</button><button onClick={() => setActiveShippingTab('zones')} className={`px-4 py-2 font-semibold ${activeShippingTab === 'zones' ? 'border-b-2 border-[#5B2C23]' : ''}`}>Shipping Zones</button><button onClick={() => setActiveShippingTab('rates')} className={`px-4 py-2 font-semibold ${activeShippingTab === 'rates' ? 'border-b-2 border-[#5B2C23]' : ''}`}>Shipping Rates</button></div><div>{activeShippingTab === 'pincodes' && (<div><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Serviceable Pincodes</h3><div className="flex items-center gap-2"><input type="text" value={pincodeSearch} onChange={e => setPincodeSearch(e.target.value)} placeholder="Search..." className="bg-black/5 rounded-full py-2 px-4 focus:ring-2 focus:ring-[#5B2C23] w-48" /><button onClick={handleAddPincode} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add</button></div></div><div className="overflow-x-auto max-h-96"><table className="w-full"><thead><tr className="bg-black/5 border-b-2 border-[#E9CBA7]"><th className="p-3 text-left">Pincode</th><th className="p-3 text-left">City</th><th className="p-3 text-left">State</th><th className="p-3 text-left">Actions</th></tr></thead><tbody>{filteredPincodes.map(p => (<tr key={p.pincode} className="border-b border-[#E9CBA7]"><td className="p-3">{p.pincode}</td><td className="p-3">{p.city}</td><td className="p-3">{p.state}</td><td className="p-3"><button onClick={() => handlePincodeDelete(p.pincode)} className="text-red-600"><TrashIcon /></button></td></tr>))}</tbody></table></div></div>)}{activeShippingTab === 'zones' && (<div><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Shipping Zones</h3><button onClick={() => openZoneModal()} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add Zone</button></div><div className="space-y-3">{zones.map(z => (<div key={z.id} className="bg-black/5 p-4 rounded-lg flex justify-between items-center"><div><p className="font-bold">{z.name}</p><p className="text-xs text-gray-600">{z.states.join(', ')}</p></div><div className="flex gap-2"><button onClick={() => openZoneModal(z)} className="text-blue-600"><PencilIcon /></button><button onClick={() => { if(window.confirm('Delete zone?')) setZones(zones.filter(sz => sz.id !== z.id)) }} className="text-red-600"><TrashIcon /></button></div></div>))}</div></div>)}{activeShippingTab === 'rates' && (<div><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Shipping Rates</h3><button onClick={() => openRateModal()} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"><PlusIcon /> Add Rate</button></div><div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-black/5 border-b-2 border-[#E9CBA7]"><th className="p-3 text-left">Zone</th><th className="p-3 text-left">Method</th><th className="p-3 text-left">Rate</th><th className="p-3 text-left">Delivery Time</th><th className="p-3 text-left">Actions</th></tr></thead><tbody>{rates.map(r => (<tr key={r.id} className="border-b border-[#E9CBA7]"><td className="p-3 font-semibold">{zones.find(z => z.id === r.zoneId)?.name}</td><td className="p-3">{r.method}</td><td className="p-3">₹{r.rate.toFixed(2)}</td><td className="p-3">{r.deliveryTime}</td><td className="p-3"><div className="flex gap-2"><button onClick={() => openRateModal(r)} className="text-blue-600"><PencilIcon /></button><button onClick={() => { if(window.confirm('Delete rate?')) setRates(rates.filter(sr => sr.id !== r.id)) }} className="text-red-600"><TrashIcon /></button></div></td></tr>))}</tbody></table></div></div>)}</div></div>);
};
const ShippingZoneModal: React.FC<{ zone: ShippingZone | null, onSave: (data: ShippingZone) => void, onClose: () => void }> = ({ zone, onSave, onClose }) => {
    const [name, setName] = useState(zone?.name || '');
    const [selectedStates, setSelectedStates] = useState<string[]>(zone?.states || []);
    const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"];
    
    const handleStateToggle = (state: string) => {
        setSelectedStates(prev => prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: zone?.id || 0, name, states: selectedStates });
    };

    return (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-[#F5EADF] rounded-2xl p-8 w-full max-w-2xl relative text-[#5B2C23]"><button onClick={onClose} className="absolute top-4 right-4 text-[#5B2C23]"><CloseIcon /></button><h2 className="text-2xl font-bold mb-6">{zone ? 'Edit' : 'Add'} Shipping Zone</h2><form onSubmit={handleSubmit} className="space-y-4"><input value={name} onChange={e => setName(e.target.value)} placeholder="Zone Name" required className="w-full bg-black/5 rounded-md p-2" /><div className="max-h-60 overflow-y-auto bg-black/5 rounded-md p-3 grid grid-cols-2 md:grid-cols-3 gap-2">{indianStates.map(s => (<label key={s} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selectedStates.includes(s)} onChange={() => handleStateToggle(s)} className="h-4 w-4 text-[#5B2C23] focus:ring-[#5B2C23]" />{s}</label>))}</div><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></div></div>);
};
const ShippingRateModal: React.FC<{ rate: ShippingRate | null, zones: ShippingZone[], onSave: (data: ShippingRate) => void, onClose: () => void }> = ({ rate, zones, onSave, onClose }) => {
    const [formData, setFormData] = useState({ zoneId: rate?.zoneId || 0, method: rate?.method || 'Standard', rate: rate?.rate || 0, deliveryTime: rate?.deliveryTime || '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: (name === 'rate' || name === 'zoneId') ? Number(value) : value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: rate?.id || 0, ...formData });
    };

    return (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-[#F5EADF] rounded-2xl p-8 w-full max-w-lg relative text-[#5B2C23]"><button onClick={onClose} className="absolute top-4 right-4 text-[#5B2C23]"><CloseIcon /></button><h2 className="text-2xl font-bold mb-6">{rate ? 'Edit' : 'Add'} Shipping Rate</h2><form onSubmit={handleSubmit} className="space-y-4"><select name="zoneId" value={formData.zoneId} onChange={handleChange} required className="w-full bg-black/5 rounded-md p-2"><option value={0} disabled>Select Zone</option>{zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}</select><div className="grid grid-cols-2 gap-4"><select name="method" value={formData.method} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2"><option value="Standard">Standard</option><option value="Express">Express</option></select><input type="number" name="rate" value={formData.rate} onChange={handleChange} placeholder="Rate (₹)" required className="w-full bg-black/5 rounded-md p-2" /></div><input name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} placeholder="e.g., 3-5 business days" required className="w-full bg-black/5 rounded-md p-2" /><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></div></div>);
};


const SettingsPage: React.FC<{ storeSettings: StoreSettings, setStoreSettings: any, paymentMethods: PaymentMethod[], setPaymentMethods: any, openModal: any }> = ({ storeSettings, setStoreSettings, paymentMethods, setPaymentMethods, openModal }) => {
    const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setStoreSettings((prev: any) => ({ ...prev, [name]: value })); };
    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setStoreSettings((prev: any) => ({ ...prev, shipping: { ...prev.shipping, [name]: parseFloat(value) || 0 } })); };
    const handleTogglePaymentMethod = (id: number) => { setPaymentMethods((prev: PaymentMethod[]) => prev.map(pm => pm.id === id ? { ...pm, enabled: !pm.enabled } : pm)); };
    const handleDeletePaymentMethod = (id: number) => { if(window.confirm('Are you sure?')) { setPaymentMethods((prev: PaymentMethod[]) => prev.filter(pm => pm.id !== id)); }};
    return (<div className="space-y-8 text-[#5B2C23]"><div className="bg-white/60 p-8 rounded-2xl shadow-lg"><h2 className="text-2xl font-bold mb-6">Store Settings</h2><form className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="block"><span className="font-semibold">Store Name</span><input type="text" name="storeName" value={storeSettings.storeName} onChange={handleStoreChange} className="w-full bg-black/5 rounded-md p-2 mt-1" /></label><label className="block"><span className="font-semibold">Contact Email</span><input type="email" name="contactEmail" value={storeSettings.contactEmail} onChange={handleStoreChange} className="w-full bg-black/5 rounded-md p-2 mt-1" /></label></div><label className="block"><span className="font-semibold">Store Address</span><textarea name="address" value={storeSettings.address} onChange={handleStoreChange} rows={3} className="w-full bg-black/5 rounded-md p-2 mt-1"></textarea></label><label className="block"><span className="font-semibold">GSTIN</span><input type="text" name="gstin" value={storeSettings.gstin} onChange={handleStoreChange} className="w-full bg-black/5 rounded-md p-2 mt-1" /></label><div className="text-right pt-4"><button type="button" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save Store Info</button></div></form></div><div className="bg-white/60 p-8 rounded-2xl shadow-lg"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold">Payment Methods</h2><button onClick={() => openModal('paymentMethod')} className="bg-[#5B2C23] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 text-sm"><PlusIcon /> Add Method</button></div><div className="space-y-3">{paymentMethods.map(pm => (<div key={pm.id} className="flex justify-between items-center bg-black/5 p-3 rounded-md"><div><span className="font-semibold">{pm.name}</span></div><div className="flex items-center gap-4"><button onClick={() => openModal('paymentMethod', pm)} className="text-blue-600"><PencilIcon className="w-4 h-4" /></button><button onClick={() => handleDeletePaymentMethod(pm.id)} className="text-red-600"><TrashIcon className="w-4 h-4" /></button><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={pm.enabled} onChange={() => handleTogglePaymentMethod(pm.id)} className="sr-only peer" /><div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5B2C23]"></div></label></div></div>))}</div></div></div>);
};
const Modal: React.FC<{ children: React.ReactNode, title: string, onClose: () => void, size?: 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' }> = ({ children, title, onClose, size = 'md' }) => {
    const sizeClasses = { md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl', '4xl': 'max-w-4xl', '5xl': 'max-w-5xl' };
    return (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}><div className={`bg-[#F5EADF] rounded-2xl p-8 w-full ${sizeClasses[size]} relative text-[#5B2C23] shadow-2xl animate-fade-in`} onClick={e => e.stopPropagation()}><button onClick={onClose} className="absolute top-4 right-4 text-[#5B2C23] hover:bg-black/10 rounded-full p-1"><CloseIcon /></button><h2 className="text-2xl font-bold mb-6">{title}</h2>{children}</div></div>);
};
const ProductModal: React.FC<{ product: Product | null; onSave: (data: Product) => void; onClose: () => void; paperTypes: PaperType[] }> = ({ product, onSave, onClose, paperTypes }) => {
    const [formData, setFormData] = useState<Product>(product ? { ...product, availablePaperTypeIds: product.availablePaperTypeIds || [] } : { id: 0, name: '', price: 0, description: '', imageUrl: '', sku: '', stock: 0, category: '', gstRate: 18, hsnCode: '', attributes: [], availablePaperTypeIds: [] });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: (name === 'price' || name === 'stock' || name === 'gstRate') ? parseFloat(value) || 0 : value })); };
    
    const handlePaperTypeToggle = (paperTypeId: number) => {
        setFormData(prev => {
            const currentIds = prev.availablePaperTypeIds || [];
            const newIds = currentIds.includes(paperTypeId)
                ? currentIds.filter(id => id !== paperTypeId)
                : [...currentIds, paperTypeId];
            return { ...prev, availablePaperTypeIds: newIds };
        });
    };

    const handleAttributeChange = (attrIndex: number, newName: string) => {
        const newAttributes = [...(formData.attributes || [])];
        newAttributes[attrIndex].name = newName;
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    const handleAddAttribute = () => {
        const newAttributes = [...(formData.attributes || []), { name: '', options: [{ value: '', priceModifier: 0 }] }];
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    const handleRemoveAttribute = (attrIndex: number) => {
        const newAttributes = [...(formData.attributes || [])];
        newAttributes.splice(attrIndex, 1);
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    const handleOptionChange = (attrIndex: number, optIndex: number, field: keyof ProductAttributeOption, newValue: string | number) => {
        const newAttributes = [...(formData.attributes || [])];
        const newOptions = [...newAttributes[attrIndex].options];
        (newOptions[optIndex] as any)[field] = field === 'priceModifier' ? Number(newValue) : newValue;
        newAttributes[attrIndex].options = newOptions;
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    const handleAddOption = (attrIndex: number) => {
        const newAttributes = [...(formData.attributes || [])];
        newAttributes[attrIndex].options.push({ value: '', priceModifier: 0 });
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    const handleRemoveOption = (attrIndex: number, optIndex: number) => {
        const newAttributes = [...(formData.attributes || [])];
        newAttributes[attrIndex].options.splice(optIndex, 1);
        setFormData(prev => ({ ...prev, attributes: newAttributes }));
    };
    
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    
    return (<Modal title={product ? "Edit Product" : "Add Product"} onClose={onClose} size="5xl">
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-4">
            {/* Basic Details */}
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full bg-black/5 rounded-md p-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Base Price" required className="w-full bg-black/5 rounded-md p-2" /><input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock Quantity" required className="w-full bg-black/5 rounded-md p-2" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="number" name="gstRate" value={formData.gstRate} onChange={handleChange} placeholder="GST Rate (%)" required className="w-full bg-black/5 rounded-md p-2" /><input name="hsnCode" value={formData.hsnCode} onChange={handleChange} placeholder="HSN Code" className="w-full bg-black/5 rounded-md p-2" /></div>
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full bg-black/5 rounded-md p-2" /><textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full bg-black/5 rounded-md p-2"></textarea>
            
            {/* Available Paper Types */}
            <div className="pt-4 mt-4 border-t border-[#E9CBA7]">
                <h3 className="text-xl font-bold mb-4">Available Paper Types</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 overflow-y-auto p-2 bg-black/5 rounded-lg">
                    {paperTypes.map(paper => (
                        <label key={paper.id} className="cursor-pointer bg-white/30 p-2 rounded-lg text-center hover:bg-white/60 transition-colors flex flex-col justify-between">
                            <img src={paper.imageUrl} alt={paper.name} className="w-full h-20 object-cover rounded-md mb-2" />
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.availablePaperTypeIds?.includes(paper.id) || false}
                                    onChange={() => handlePaperTypeToggle(paper.id)}
                                    className="h-4 w-4 rounded text-[#5B2C23] focus:ring-[#5B2C23] border-gray-300"
                                />
                                <span className="text-xs font-semibold leading-tight flex-1">{paper.name}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Attributes & Variations */}
            <div className="pt-4 mt-4 border-t border-[#E9CBA7]"><h3 className="text-xl font-bold mb-4">Product Attributes & Variations</h3>
                <div className="space-y-4">
                    {(formData.attributes || []).map((attr, attrIndex) => (
                        <div key={attrIndex} className="bg-black/5 p-4 rounded-lg"><div className="flex justify-between items-center mb-3"><input value={attr.name} onChange={(e) => handleAttributeChange(attrIndex, e.target.value)} placeholder="Attribute Name (e.g., Paper Color)" className="w-full bg-transparent font-bold text-lg focus:outline-none" /><button type="button" onClick={() => handleRemoveAttribute(attrIndex)} className="text-red-600 hover:text-red-800 p-1"><TrashIcon /></button></div>
                            <div className="space-y-2 pl-4 border-l-2 border-[#E9CBA7]">
                                {attr.options.map((opt, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                        <input value={opt.value} onChange={(e) => handleOptionChange(attrIndex, optIndex, 'value', e.target.value)} placeholder="Option Name (e.g., Ivory)" className="flex-grow bg-white/50 rounded-md p-2" />
                                        <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span><input type="number" value={opt.priceModifier || 0} onChange={(e) => handleOptionChange(attrIndex, optIndex, 'priceModifier', e.target.value)} placeholder="Modifier" className="w-32 bg-white/50 rounded-md p-2 pl-6" /></div>
                                        <button type="button" onClick={() => handleRemoveOption(attrIndex, optIndex)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddOption(attrIndex)} className="text-sm font-semibold text-blue-600 hover:underline pt-2">+ Add Option</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleAddAttribute} className="mt-4 bg-[#8C6653] text-white font-bold py-2 px-4 rounded-xl text-sm flex items-center gap-2 hover:bg-opacity-90"><PlusIcon /> Add Attribute</button>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-[#E9CBA7]"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save Product</button></div>
        </form>
    </Modal>);
};
const OrderDetailsModal: React.FC<{ order: OrderDetails; writers: Writer[], onAssignWriter: (orderNumber: string, writerId: number) => void; onClose: () => void }> = ({ order, writers, onAssignWriter, onClose }) => (
    <Modal title={`Order Details: #${order.orderNumber}`} onClose={onClose} size="xl"><div className="grid md:grid-cols-2 gap-8"><div className="space-y-4"><div><h3 className="font-bold">Customer</h3><p>{order.customerName}</p><p>{order.shippingAddress.email}</p></div><div><h3 className="font-bold">Shipping Address</h3><address className="not-italic text-sm">{order.shippingAddress.flat}, {order.shippingAddress.street}<br />{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</address></div><div><h3 className="font-bold">Assign Writer</h3><select value={order.writerId || ''} onChange={e => onAssignWriter(order.orderNumber, parseInt(e.target.value))} className="w-full bg-black/5 rounded-md p-2"><option value="">Unassigned</option>{writers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></div></div><div><h3 className="font-bold mb-2">Items</h3><div className="space-y-2 border-b border-[#E9CBA7] pb-2 mb-2">{order.items.map(i => (<div key={i.id} className="flex justify-between text-sm"><span className="capitalize">{i.productName.toLowerCase()}</span><span className="font-semibold">₹{i.price.toFixed(2)}</span></div>))}</div><div className="space-y-1 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span></div>{order.discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({order.couponCode})</span><span>- ₹{order.discountAmount.toFixed(2)}</span></div>}<div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingCost.toFixed(2)}</span></div><div className="flex justify-between"><span>GST</span><span>₹{order.taxAmount.toFixed(2)}</span></div><div className="flex justify-between font-bold text-base mt-2"><span>Total</span><span>₹{order.total.toFixed(2)}</span></div></div></div></div></Modal>
);
const CustomerDetailsModal: React.FC<{ customer: User, onClose: () => void }> = ({ customer, onClose }) => (<Modal title="Customer Details" onClose={onClose}><div className="space-y-2"><p><span className="font-bold">Name:</span> {customer.name}</p><p><span className="font-bold">Email:</span> {customer.email}</p><p><span className="font-bold">Joined:</span> {customer.joinedDate}</p><p><span className="font-bold">Address:</span> {customer.address.flat}, {customer.address.street}, {customer.address.city}, {customer.address.state} - {customer.address.zip}</p><p><span className="font-bold">Notes:</span> {customer.notes || 'N/A'}</p></div></Modal>);
const CustomerEditModal: React.FC<{ customer: User | null, onSave: (data: User) => void, onClose: () => void }> = ({ customer, onSave, onClose }) => {
    const [formData, setFormData] = useState<User>(customer || { id: 0, name: '', email: '', isAdmin: false, joinedDate: new Date().toLocaleDateString(), mobile: '', address: { flat: '', street: '', city: '', state: '', zip: '' }, notes: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, address: { ...prev.address, [name]: value } })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (<Modal title={customer ? "Edit Customer" : "Add Customer"} onClose={onClose} size="lg"><form onSubmit={handleSubmit} className="space-y-4"><div className="grid md:grid-cols-2 gap-4"><input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full bg-black/5 rounded-md p-2" /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full bg-black/5 rounded-md p-2" /></div><input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-full bg-black/5 rounded-md p-2" /><input name="flat" value={formData.address.flat} onChange={handleAddressChange} placeholder="Flat/Building" className="w-full bg-black/5 rounded-md p-2" /><input name="street" value={formData.address.street} onChange={handleAddressChange} placeholder="Street/Area" className="w-full bg-black/5 rounded-md p-2" /><div className="grid md:grid-cols-3 gap-4"><input name="city" value={formData.address.city} onChange={handleAddressChange} placeholder="City" className="w-full bg-black/5 rounded-md p-2" /><input name="state" value={formData.address.state} onChange={handleAddressChange} placeholder="State" className="w-full bg-black/5 rounded-md p-2" /><input name="zip" value={formData.address.zip} onChange={handleAddressChange} placeholder="ZIP Code" className="w-full bg-black/5 rounded-md p-2" /></div><textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Customer Notes" rows={3} className="w-full bg-black/5 rounded-md p-2" /><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const PaymentMethodModal: React.FC<{ method: PaymentMethod | null; onSave: (data: PaymentMethod) => void; onClose: () => void }> = ({ method, onSave, onClose }) => {
    const [name, setName] = useState(method?.name || '');
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ id: method?.id || 0, name, enabled: method?.enabled ?? true }); };
    return (<Modal title={method ? "Edit Method" : "Add Method"} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><input value={name} onChange={e => setName(e.target.value)} placeholder="Payment Method Name" required className="w-full bg-black/5 rounded-md p-2" /><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const ShipmentModal: React.FC<{ shipment: Shipment; onSave: (data: Shipment) => void; onClose: () => void }> = ({ shipment, onSave, onClose }) => {
    const [formData, setFormData] = useState<Shipment>(shipment);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (<Modal title={`Edit Shipment for Order #${shipment.orderNumber}`} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><input name="carrier" value={formData.carrier} onChange={handleChange} placeholder="Carrier (e.g., Delhivery)" className="w-full bg-black/5 rounded-md p-2" /><input name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} placeholder="Tracking Number" className="w-full bg-black/5 rounded-md p-2" /><input type="date" name="shippingDate" value={formData.shippingDate || ''} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2" /><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2"><option>Pending</option><option>Shipped</option><option>In Transit</option><option>Out for Delivery</option><option>Delivered</option><option>Failed Attempt</option></select><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const CouponModal: React.FC<{ coupon: Coupon | null; onSave: (data: Coupon) => void; onClose: () => void }> = ({ coupon, onSave, onClose }) => {
    const [formData, setFormData] = useState<Coupon>(coupon || { id: 0, code: '', type: 'percentage', value: 0, isActive: true });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { const { name, value, type } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (<Modal title={coupon ? 'Edit Coupon' : 'New Coupon'} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><input name="code" value={formData.code} onChange={handleChange} placeholder="Coupon Code" required className="w-full bg-black/5 rounded-md p-2" /><div className="grid md:grid-cols-2 gap-4"><select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2"><option value="percentage">Percentage (%)</option><option value="fixed">Fixed Amount (₹)</option></select><input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Value" required className="w-full bg-black/5 rounded-md p-2" /></div><label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-5 w-5 text-[#5B2C23] focus:ring-[#5B2C23]" /> Active</label><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const WriterModal: React.FC<{ writer: Writer | null; onSave: (data: Writer) => void; onClose: () => void }> = ({ writer, onSave, onClose }) => {
    const [formData, setFormData] = useState<Writer>(writer || { id: 0, name: '', specialty: '', assignedOrders: 0, status: 'Available' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (<Modal title={writer ? 'Edit Writer' : 'Add Writer'} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><input name="name" value={formData.name} onChange={handleChange} placeholder="Writer's Name" required className="w-full bg-black/5 rounded-md p-2" /><input name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty (e.g., Cursive, Calligraphy)" required className="w-full bg-black/5 rounded-md p-2" /><select name="status" value={formData.status} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2"><option>Available</option><option>Busy</option><option>On Vacation</option></select><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const TestimonialModal: React.FC<{ testimonial: Testimonial | null; onSave: (data: Testimonial) => void; onClose: () => void }> = ({ testimonial, onSave, onClose }) => {
    const [formData, setFormData] = useState<Testimonial>(testimonial || { id: 0, quote: '', author: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData); };
    return (<Modal title={testimonial ? 'Edit Testimonial' : 'Add Testimonial'} onClose={onClose}><form onSubmit={handleSubmit} className="space-y-4"><textarea name="quote" value={formData.quote} onChange={handleChange} placeholder="Quote" rows={4} required className="w-full bg-black/5 rounded-md p-2"></textarea><input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required className="w-full bg-black/5 rounded-md p-2" /><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const OccasionModal: React.FC<{ occasion: Occasion | null; onSave: (data: Omit<Occasion, 'id'> & { id?: number }) => void; onClose: () => void }> = ({ occasion, onSave, onClose }) => {
    const [formData, setFormData] = useState(occasion || { name: '', category: mainCategories[0].name, description: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: occasion?.id });
    };
    return (<Modal title={occasion ? 'Edit Occasion' : 'Add Occasion'} onClose={onClose} size="lg"><form onSubmit={handleSubmit} className="space-y-4"><input name="name" value={formData.name} onChange={handleChange} placeholder="Occasion Name" required className="w-full bg-black/5 rounded-md p-2" /><select name="category" value={formData.category} onChange={handleChange} className="w-full bg-black/5 rounded-md p-2">{mainCategories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}</select><textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} required className="w-full bg-black/5 rounded-md p-2"></textarea><div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="bg-gray-200 font-bold py-2 px-6 rounded-xl text-[#5B2C23]">Cancel</button><button type="submit" className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Save</button></div></form></Modal>);
};
const InvoiceModal: React.FC<{ order: OrderDetails, storeSettings: StoreSettings, onClose: () => void }> = ({ order, storeSettings, onClose }) => {
    const handlePrint = () => { const printable = document.getElementById('invoice-content'); if (printable) { const printWindow = window.open('', '', 'height=600,width=800'); printWindow?.document.write('<html><head><title>Invoice</title><script src="https://cdn.tailwindcss.com"></script></head><body>'); printWindow?.document.write(printable.innerHTML); printWindow?.document.write('</body></html>'); printWindow?.document.close(); printWindow?.print(); } };
    return (<Modal title={`Invoice for Order #${order.orderNumber}`} onClose={onClose} size="2xl"><div id="invoice-content" className="p-4 text-gray-800"><div className="flex justify-between items-start border-b pb-4 mb-4"><div className="text-sm"><h2 className="text-xl font-bold">{storeSettings.storeName}</h2><p>{storeSettings.address}</p><p>GSTIN: {storeSettings.gstin}</p></div><div className="text-right text-sm"><h3 className="text-lg font-bold">Invoice</h3><p>#{order.orderNumber}</p><p>Date: {new Date(order.date).toLocaleDateString()}</p></div></div><div className="flex justify-between text-sm mb-6"><div className="max-w-xs"><b>Bill To:</b><br />{order.shippingAddress.fullName}<br />{order.shippingAddress.flat}, {order.shippingAddress.street}<br />{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</div><div className="max-w-xs text-right"><b>Ship To:</b><br />{order.shippingAddress.fullName}<br />{order.shippingAddress.flat}, {order.shippingAddress.street}<br />{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</div></div><table className="w-full text-sm text-left"><thead><tr className="bg-gray-100"><th className="p-2">Item</th><th className="p-2 text-right">Price</th></tr></thead><tbody>{order.items.map(item => (<tr key={item.id} className="border-b"><td className="p-2">{item.productName}</td><td className="p-2 text-right">₹{item.price.toFixed(2)}</td></tr>))}</tbody></table><div className="flex justify-end mt-4"><div className="w-full max-w-xs text-sm space-y-1"><div className="flex justify-between"><span>Subtotal:</span><span>₹{order.subtotal.toFixed(2)}</span></div>{order.discountAmount > 0 && <div className="flex justify-between"><span>Discount:</span><span>-₹{order.discountAmount.toFixed(2)}</span></div>}<div className="flex justify-between"><span>Shipping:</span><span>₹{order.shippingCost.toFixed(2)}</span></div><div className="flex justify-between"><span>GST:</span><span>₹{order.taxAmount.toFixed(2)}</span></div><div className="flex justify-between font-bold text-base border-t mt-2 pt-2"><span>Total:</span><span>₹{order.total.toFixed(2)}</span></div></div></div></div><div className="text-right mt-6"><button onClick={handlePrint} className="bg-[#5B2C23] text-white font-bold py-2 px-6 rounded-xl">Print Invoice</button></div></Modal>);
};

export default AdminDashboard;