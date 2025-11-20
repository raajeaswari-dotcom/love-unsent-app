

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import ClassicLetterPage from './components/ClassicLetterPage';
import OpenWhenLetterPage from './components/OpenWhenLetterPage';
import UnsentLetterPage from './components/UnsentLetterPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import Testimonials from './components/Testimonials';
import TrackOrderPage from './components/TrackOrderPage';
import Categories from './components/Categories';
import SupportChatbot from './components/SupportChatbot';
import TarotReader from './components/TarotReader';
import AdminLoginPage from './components/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import LegalPage from './components/LegalPage';


export interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  gstRate?: number;
  message?: string;
  occasion?: string;
  language?: string;
  writingStyle?: string;
  paperType?: string;
  inkColor?: string;
  paperQuality?: string;
  gsm?: string;
  style?: string;
  paperColor?: string;
}

export interface ShippingAddress {
    fullName: string;
    flat: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
}

export interface OrderDetails {
  orderNumber: string;
  subtotal: number;
  total: number;
  items: CartItem[];
  date: string;
  customerName: string;
  status: 'Processing' | 'Writing' | 'Packaged' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: ShippingAddress;
  taxAmount: number;
  taxRate: number;
  discountAmount?: number;
  couponCode?: string;
  shippingCost: number;
  writerId?: number;
  addOns?: {
    giftWrap?: number;
    perfume?: number;
  };
  deliveryMethod?: 'Standard' | 'Express';
  deliveryDate?: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  isAdmin: boolean;
  joinedDate: string;
  mobile: string;
  address: {
    flat: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  notes: string;
}

export interface ProductAttributeOption {
  value: string;
  priceModifier?: number;
}

export interface ProductAttribute {
  name: string;
  options: ProductAttributeOption[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sku: string;
  stock: number;
  category: string;
  gstRate?: number;
  hsnCode?: string;
  attributes?: ProductAttribute[];
  availablePaperTypeIds?: number[];
}

export interface Transaction {
  transactionId: string;
  orderNumber: string;
  date: string;
  customerName: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Refunded';
  paymentMethod: string;
  cardLast4: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  enabled: boolean;
}

export interface TaxSettings {
    rate: number;
    included: boolean;
}

export interface Shipment {
  shipmentId: string;
  orderNumber: string;
  customerName: string;
  shippingDate: string | null;
  carrier: string;
  trackingNumber: string;
  status: 'Pending' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Failed Attempt';
}

export interface Coupon {
    id: number;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    isActive: boolean;
}

export interface StoreSettings {
    storeName: string;
    address: string;
    gstin: string;
    contactEmail: string;
    shipping: {
        flatRate: number;
        freeShippingThreshold: number;
    };
}

export interface Writer {
  id: number;
  name: string;
  specialty: string;
  assignedOrders: number;
  status: 'Available' | 'Busy' | 'On Vacation';
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

export interface Occasion {
    id: number;
    name: string;
    category: string;
    description: string;
}

export interface PaperType {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}


const App: React.FC = () => {
  const [page, setPage] = useState<{ name: string; props: any; anchor?: string }>({ name: 'home', props: {} });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [paperTypes, setPaperTypes] = useState<PaperType[]>([]);
  
  useEffect(() => {
    const API_BASE_URL = 'https://love-unsent-app-final-backend.onrender.com/api';


    const fetchPublicData = async () => {
        try {
            const endpoints = ['products', 'testimonials', 'users', 'occasions', 'papertypes'];
            const requests = endpoints.map(endpoint => fetch(`${API_BASE_URL}/${endpoint}`));
            const responses = await Promise.all(requests);

            for (const res of responses) {
                if (!res.ok) {
                    console.error(`Failed to fetch: ${res.status} ${res.statusText} from ${res.url}`);
                }
            }
            
            const [productsData, testimonialsData, customersData, occasionsData, paperTypesData] = await Promise.all(responses.map(res => res.ok ? res.json() : []));
            
            setProducts(productsData);
            setTestimonials(testimonialsData);
            setCustomers(customersData);
            setOccasions(occasionsData);
            setPaperTypes(paperTypesData);

        } catch (error) {
            console.error("Failed to fetch initial data from backend:", error);
        }
    };

    fetchPublicData();
  }, []);

  useEffect(() => {
    if (page.anchor) {
      const timer = setTimeout(() => {
        document.getElementById(page.anchor as string)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const navigate = (targetPage: string, props = {}, anchor?: string) => {
    setPage({ name: targetPage, props, anchor });
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const productDetails = products.find(p => p.name.toUpperCase() === "CLASSIC");
    const itemWithGst: CartItem = { ...item, id: Date.now(), gstRate: productDetails?.gstRate || 0 };
    setCart(prevCart => [...prevCart, itemWithGst]);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const finalizeOrder = (verifiedOrder: OrderDetails) => {
      setOrderHistory(prev => [verifiedOrder, ...prev]);
      setCart([]);
      navigate('order-confirmation', { orderDetails: verifiedOrder });
  };

  const handleLogin = (email: string, password?: string, name?: string) => {
    // Admin login is now handled separately
    const existingCustomer = customers.find(c => c.email.toLowerCase() === email.toLowerCase());

    if (existingCustomer) {
        setUser({ ...existingCustomer, isAdmin: false });
    } else {
        const newUser: User = {
            id: Date.now(),
            email,
            name: name || 'Valued Customer',
            isAdmin: false,
            joinedDate: new Date().toLocaleDateString(),
            mobile: '',
            address: { flat: '', street: '', city: '', state: '', zip: '' },
            notes: '',
        };
        setUser(newUser);
        setCustomers(prev => [...prev, newUser]);
    }

    setIsAuthenticated(true);
    navigate('home');
  };

  const handleAdminLoginSuccess = (adminUser: User) => {
    setUser(adminUser);
    setIsAuthenticated(true);
    navigate('admin-dashboard');
  };
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminToken');
    navigate('home');
  };

  let pageContent;
  if (page.name === 'home') {
    pageContent = (
      <>
        <Hero navigate={navigate}/>
        <div className="h-12 bg-[#5B2C23]"></div>
        <Categories navigate={navigate} />
        <Testimonials testimonials={testimonials} />
        <HowItWorks />
        <Newsletter />
      </>
    );
  } else if (page.name === 'classic-letter') {
    pageContent = <ClassicLetterPage navigate={navigate} addToCart={addToCart} products={products} occasions={occasions} paperTypes={paperTypes} {...page.props} />;
  } else if (page.name === 'open-when-letter') {
    pageContent = <OpenWhenLetterPage navigate={navigate} addToCart={addToCart} products={products} paperTypes={paperTypes} />;
  } else if (page.name === 'unsent-letter') {
    pageContent = <UnsentLetterPage navigate={navigate} addToCart={addToCart} products={products} paperTypes={paperTypes} />;
  } else if (page.name === 'shop') {
    pageContent = <ShopPage products={products} occasions={occasions} navigate={navigate} initialCategory={page.props.initialCategory} />;
  } else if (page.name === 'tarot') {
    pageContent = <TarotReader />;
  } else if (page.name === 'about') {
    pageContent = <AboutPage />;
  } else if (page.name === 'faq') {
    pageContent = <FaqPage />;
  } else if (page.name === 'terms') {
      pageContent = <LegalPage title="Terms of Service" content="[Placeholder for Terms of Service content...]" />;
  } else if (page.name === 'privacy') {
      pageContent = <LegalPage title="Privacy Policy" content="[Placeholder for Privacy Policy content...]" />;
  } else if (page.name === 'contact') {
    pageContent = <ContactPage />;
  } else if (page.name === 'cart') {
    pageContent = <CartPage navigate={navigate} cart={cart} removeFromCart={removeFromCart} />;
  } else if (page.name === 'checkout') {
    pageContent = <CheckoutPage 
        navigate={navigate} 
        cart={cart}
        finalizeOrder={finalizeOrder} 
        coupons={coupons}
        user={user}
        addOnCosts={page.props.addOnCosts}
    />;
  } else if (page.name === 'order-confirmation') {
    pageContent = <OrderConfirmationPage navigate={navigate} orderDetails={page.props.orderDetails} />;
  } else if (page.name === 'login') {
    pageContent = <LoginPage navigate={navigate} onLogin={handleLogin} />;
  } else if (page.name === 'admin-login') {
    pageContent = <AdminLoginPage onLoginSuccess={handleAdminLoginSuccess} />;
  } else if (page.name === 'register') {
    pageContent = <RegisterPage navigate={navigate} onRegister={handleLogin} />;
  } else if (page.name === 'profile') {
    pageContent = <ProfilePage navigate={navigate} user={user} orderHistory={orderHistory} />;
  } else if (page.name === 'track-order') {
    pageContent = <TrackOrderPage navigate={navigate} orders={orderHistory} {...page.props} />;
  } else if (page.name === 'admin-dashboard') {
    pageContent = (
      <ProtectedRoute navigate={navigate}>
        <AdminDashboard occasions={occasions} setOccasions={setOccasions} paperTypes={paperTypes} setPaperTypes={setPaperTypes} />
      </ProtectedRoute>
    );
  }


  return (
    <div className={`${page.name === 'home' ? 'bg-[#5B2C23]' : 'bg-[#F5EADF]'} text-[#5B2C23]`}>
      <Header 
        page={page.name} 
        anchor={page.anchor} 
        navigate={navigate} 
        cartCount={cart.length} 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {pageContent}
      </main>
      {page.name.startsWith('admin') ? null : <SupportChatbot />}
      { (page.name === 'home' || ['about', 'faq', 'contact', 'terms', 'privacy'].includes(page.name)) && <Footer navigate={navigate} /> }
    </div>
  );
};

export default App;