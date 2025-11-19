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

// ===================== INTERFACES ===================== //

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
  status:
    | 'Processing'
    | 'Writing'
    | 'Packaged'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';
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

// ===================== MAIN APP ===================== //

const App: React.FC = () => {
  const [page, setPage] = useState<{ name: string; props: any; anchor?: string }>({
    name: 'home',
    props: {}
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [coupons, setCoupons] = useState([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [paperTypes, setPaperTypes] = useState<PaperType[]>([]);

  const API_BASE_URL = 'https://love-unsent-app-final-backend.onrender.com/api';

  // ===================== FIX FOR RENDER HARD REFRESH ===================== //
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');

    if (path === 'admin-login') {
      setPage({ name: 'admin-login', props: {} });
    } else if (path === 'admin-dashboard') {
      setPage({ name: 'admin-dashboard', props: {} });
    }
  }, []);

  // ===================== LOAD PUBLIC DATA ===================== //
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const endpoints = ['products', 'testimonials', 'users', 'occasions', 'papertypes'];
        const responses = await Promise.all(
          endpoints.map((e) => fetch(`${API_BASE_URL}/${e}`))
        );

        const data = await Promise.all(
          responses.map((res) => (res.ok ? res.json() : []))
        );

        setProducts(data[0]);
        setTestimonials(data[1]);
        setCustomers(data[2]);
        setOccasions(data[3]);
        setPaperTypes(data[4]);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchPublicData();
  }, []);

  // ===================== PAGE SCROLLING ===================== //
  useEffect(() => {
    if (page.anchor) {
      setTimeout(() => {
        document.getElementById(page.anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  // ===================== NAVIGATION ===================== //

  const navigate = (name: string, props = {}, anchor?: string) => {
    setPage({ name, props, anchor });
    window.history.pushState({}, '', `/${name}`);
  };

  // ===================== AUTH ===================== //

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

  // ===================== CART ===================== //

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const classic = products.find((p) => p.name.toUpperCase() === 'CLASSIC');

    const fullItem: CartItem = {
      ...item,
      id: Date.now(),
      gstRate: classic?.gstRate || 0
    };

    setCart((prev) => [...prev, fullItem]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const finalizeOrder = (verifiedOrder: OrderDetails) => {
    setOrderHistory((prev) => [verifiedOrder, ...prev]);
    setCart([]);
    navigate('order-confirmation', { orderDetails: verifiedOrder });
  };

  // ===================== PAGE RENDERING ===================== //

  let pageContent;

  switch (page.name) {
    case 'classic-letter':
      pageContent = (
        <ClassicLetterPage
          navigate={navigate}
          addToCart={addToCart}
          products={products}
          occasions={occasions}
          paperTypes={paperTypes}
          {...page.props}
        />
      );
      break;

    case 'open-when-letter':
      pageContent = (
        <OpenWhenLetterPage
          navigate={navigate}
          addToCart={addToCart}
          products={products}
          paperTypes={paperTypes}
        />
      );
      break;

    case 'unsent-letter':
      pageContent = (
        <UnsentLetterPage
          navigate={navigate}
          addToCart={addToCart}
          products={products}
          paperTypes={paperTypes}
        />
      );
      break;

    case 'shop':
      pageContent = (
        <ShopPage
          products={products}
          occasions={occasions}
          navigate={navigate}
          initialCategory={page.props.initialCategory}
        />
      );
      break;

    case 'tarot':
      pageContent = <TarotReader />;
      break;

    case 'about':
      pageContent = <AboutPage />;
      break;

    case 'faq':
      pageContent = <FaqPage />;
      break;

    case 'terms':
      pageContent = <LegalPage title="Terms of Service" content="[Placeholder...]" />;
      break;

    case 'privacy':
      pageContent = <LegalPage title="Privacy Policy" content="[Placeholder...]" />;
      break;

    case 'contact':
      pageContent = <ContactPage />;
      break;

    case 'cart':
      pageContent = <CartPage navigate={navigate} cart={cart} removeFromCart={removeFromCart} />;
      break;

    case 'checkout':
      pageContent = (
        <CheckoutPage
          navigate={navigate}
          cart={cart}
          finalizeOrder={finalizeOrder}
          coupons={coupons}
          user={user}
          addOnCosts={page.props.addOnCosts}
        />
      );
      break;

    case 'order-confirmation':
      pageContent = (
        <OrderConfirmationPage navigate={navigate} orderDetails={page.props.orderDetails} />
      );
      break;

    case 'login':
      pageContent = <LoginPage navigate={navigate} onLogin={() => {}} />;
      break;

    case 'admin-login':
      pageContent = <AdminLoginPage onLoginSuccess={handleAdminLoginSuccess} />;
      break;

    case 'register':
      pageContent = <RegisterPage navigate={navigate} onRegister={() => {}} />;
      break;

    case 'profile':
      pageContent = <ProfilePage navigate={navigate} user={user} orderHistory={orderHistory} />;
      break;

    case 'track-order':
      pageContent = <TrackOrderPage navigate={navigate} orders={orderHistory} {...page.props} />;
      break;

    case 'admin-dashboard':
      pageContent = (
        <ProtectedRoute navigate={navigate}>
          <AdminDashboard
            occasions={occasions}
            setOccasions={setOccasions}
            paperTypes={paperTypes}
            setPaperTypes={setPaperTypes}
          />
        </ProtectedRoute>
      );
      break;

    default:
      pageContent = (
        <>
          <Hero navigate={navigate} />
          <div className="h-12 bg-[#5B2C23]"></div>
          <Categories navigate={navigate} />
          <Testimonials testimonials={testimonials} />
          <HowItWorks />
          <Newsletter />
        </>
      );
  }

  // ===================== RETURN ===================== //

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

      <main>{pageContent}</main>

      {!page.name.startsWith('admin') && <SupportChatbot />}

      {(page.name === 'home' ||
        ['about', 'faq', 'contact', 'terms', 'privacy'].includes(page.name)) && (
        <Footer navigate={navigate} />
      )}
    </div>
  );
};

export default App;
