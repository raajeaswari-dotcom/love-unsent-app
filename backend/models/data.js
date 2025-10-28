
const products = [
  { id: 1, name: "CLASSIC", price: 1499, description: "Pour your heart onto paper with our timeless Classic Letter.", imageUrl: "https://storage.googleapis.com/aistudio-hosting/image-49e083c2-d35b-4351-a08b-4b1368fd6093.jpeg", sku: "LU-CLS-001", stock: 50, category: "Classic Letters", gstRate: 12, hsnCode: "49090010" },
  { id: 2, name: "OPEN WHEN", price: 1999, description: "A timeless bundle of sealed letters to be opened at just the right moment.", imageUrl: "https://images.unsplash.com/photo-1562443252-c36216c52b41?q=80&w=800&auto=format&fit=crop", sku: "LU-OPW-001", stock: 35, category: "Letter Bundles", gstRate: 12, hsnCode: "49090010" },
  { id: 3, name: "UNSENT", price: 1199, description: "A space to express your deepest thoughts and feelings without the pressure of sending them.", imageUrl: "https://images.unsplash.com/photo-1520492142442-c24599a2a3e6?q=80&w=800&auto=format&fit=crop", sku: "LU-UNS-001", stock: 100, category: "Personal Letters", gstRate: 12, hsnCode: "49090010" },
  { id: 4, name: "P.S. I LOVE YOU", price: 1499, description: "Three simple words, a universe of meaning.", imageUrl: "https://images.unsplash.com/photo-1550950387-cb94602f2324?q=80&w=800&auto=format&fit=crop", sku: "LU-PSL-001", stock: 0, category: "Romantic Letters", gstRate: 12, hsnCode: "49090010" },
  { id: 5, name: "GOOD BYE WITH LOVE", price: 1499, description: "Saying goodbye is never easy, but it can be done with grace and love.", imageUrl: "https://images.unsplash.com/photo-1515671765102-12002f237f37?q=80&w=800&auto=format&fit=crop", sku: "LU-GBW-001", stock: 20, category: "Sentimental Letters", gstRate: 12, hsnCode: "49090010" },
  { id: 6, name: "WORDS OF WISDOM", price: 1499, description: "Share the lessons you've learned, the advice you hold dear.", imageUrl: "https://images.unsplash.com/photo-1593113646773-4621c1a51167?q=80&w=800&auto=format&fit=crop", sku: "LU-WOW-001", stock: 42, category: "Guidance Letters", gstRate: 12, hsnCode: "49090010" }
];

const customers = [
    { id: 101, name: "Aarav Sharma", email: "aarav.s@example.com", isAdmin: false, joinedDate: "10/15/2023", mobile: "9876543210", address: { flat: "Apt 4B, Sunshine Towers", street: "42 MG Road", city: "Bangalore", state: "Karnataka", zip: "560001" }, notes: "Loyal customer, prefers parchment paper." },
    { id: 102, name: "Saanvi Patel", email: "saanvi.p@example.com", isAdmin: false, joinedDate: "11/20/2023", mobile: "9123456780", address: { flat: "Flat 12, Marine View", street: "182 Linking Road", city: "Mumbai", state: "Maharashtra", zip: "400050" }, notes: "Frequently orders 'Open When' bundles for her family." },
    { id: 103, name: "Vivaan Singh", email: "vivaan.s@example.com", isAdmin: false, joinedDate: "01/05/2024", mobile: "8765432109", address: { flat: "Shop No. 5", street: "77 Connaught Place", city: "New Delhi", state: "Delhi", zip: "110001" }, notes: "First order was a 'P.S. I Love You' letter." },
    { id: 104, name: "Ananya Gupta", email: "ananya.g@example.com", isAdmin: false, joinedDate: "02/12/2024", mobile: "7890123456", address: { flat: "3rd Floor, Park Mansions", street: "9 Park Street", city: "Kolkata", state: "West Bengal", zip: "700016" }, notes: "" }
];

const paymentMethods = [
    { id: 1, name: "Credit Card", enabled: true },
    { id: 2, name: "UPI", enabled: true },
    { id: 3, name: "Paytm", enabled: true },
    { id: 4, name: "Razorpay", enabled: true }
];

const coupons = [
    { id: 1, code: "WELCOME10", type: "percentage", value: 10, isActive: true },
    { id: 2, code: "FLAT150", type: "fixed", value: 150, isActive: true },
    { id: 3, code: "SALE2024", type: "percentage", value: 20, isActive: false },
];

const writers = [
    { id: 1, name: "Rohan Verma", specialty: "Calligraphy", assignedOrders: 2, status: 'Available' },
    { id: 2, name: "Sneha Reddy", specialty: "Cursive", assignedOrders: 5, status: 'Busy' },
    { id: 3, name: "Aditya Singh", specialty: "Minimalist", assignedOrders: 0, status: 'On Vacation' },
];

const testimonials = [
    { id: 1, quote: "The most beautiful gift I've ever received. The letter was pure art and emotion.", author: "Anjali P." },
    { id: 2, quote: "I was speechless. It felt like the words were taken right from my heart. Thank you, Copy of Love.", author: "Vikram S." },
    { id: 3, quote: "Absolutely stunning. The craftsmanship, the paper, the handwritten words... everything was perfect.", author: "Priya K." },
    { id: 4, quote: "A truly unique and personal gift. The AI helper was surprisingly good at capturing my feelings.", author: "Rohan M." },
];

let orders = [];
let shipments = [];

module.exports = {
    products,
    customers,
    paymentMethods,
    coupons,
    writers,
    testimonials,
    orders,
    shipments,
};
