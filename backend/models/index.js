

const products = [
  { 
    id: 1, 
    name: "CLASSIC", 
    price: 1499, 
    description: "Pour your heart onto paper with our timeless Classic Letter.", 
    imageUrl: "https://images.pexels.com/photos/4207783/pexels-photo-4207783.jpeg?auto=compress&cs=tinysrgb&w=800", 
    sku: "LU-CLS-001", 
    stock: 50, 
    category: "Classic Letters", 
    gstRate: 12, 
    hsnCode: "49090010",
    availablePaperTypeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    attributes: [
      {
        name: "Paper Quality",
        options: [
          { value: "Basic Paper", priceModifier: 0 },
          { value: "Premium Paper", priceModifier: 200 },
          { value: "Luxury Paper", priceModifier: 450 }
        ]
      },
      {
        name: "Paper Color",
        options: [
          { value: "White", priceModifier: 0 },
          { value: "Ivory", priceModifier: 50 },
          { value: "Brown Kraft", priceModifier: 25 },
          { value: "Pastel Pink", priceModifier: 75 }
        ]
      },
      {
        name: "Paper Thickness (GSM)",
        options: [
          { value: "100–120 GSM (Standard Weight)", priceModifier: 0 },
          { value: "120–150 GSM (Premium Weight)", priceModifier: 100 },
          { value: "200–250 GSM (Heavy Weight)", priceModifier: 150 }
        ]
      }
    ]
  },
  { id: 2, name: "OPEN WHEN", price: 1999, description: "A timeless bundle of sealed letters to be opened at just the right moment.", imageUrl: "https://images.pexels.com/photos/7174415/pexels-photo-7174415.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-OPW-001", stock: 35, category: "Letter Bundles", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [3, 4, 6, 8, 10] },
  { id: 3, name: "UNSENT", price: 1199, description: "A space to express your deepest thoughts and feelings without the pressure of sending them.", imageUrl: "https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-UNS-001", stock: 100, category: "Personal Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [2, 5, 7, 12] },
  { id: 4, name: "P.S. I LOVE YOU", price: 1499, description: "Three simple words, a universe of meaning.", imageUrl: "https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-PSL-001", stock: 0, category: "Romantic Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [1, 3, 9] },
  { id: 5, name: "GOOD BYE WITH LOVE", price: 1499, description: "Saying goodbye is never easy, but it can be done with grace and love.", imageUrl: "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-GBW-001", stock: 20, category: "Sentimental Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [5, 6, 11] },
  { id: 6, name: "WORDS OF WISDOM", price: 1499, description: "Share the lessons you've learned, the advice you hold dear.", imageUrl: "https://images.pexels.com/photos/6231819/pexels-photo-6231819.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-WOW-001", stock: 42, category: "Guidance Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [1, 3, 4, 5, 6] }
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
    { id: 2, quote: "I was speechless. It felt like the words were taken right from my heart. Thank you, Love Unsent.", author: "Vikram S." },
    { id: 3, quote: "Absolutely stunning. The craftsmanship, the paper, the handwritten words... everything was perfect.", author: "Priya K." },
    { id: 4, quote: "A truly unique and personal gift. The AI helper was surprisingly good at capturing my feelings.", author: "Rohan M." },
];

const shippingZones = [
  { id: 1, name: 'Metro Cities', states: ['Delhi', 'Maharashtra', 'Karnataka', 'West Bengal', 'Tamil Nadu'] },
  { id: 2, name: 'Tier 1 Cities', states: ['Gujarat', 'Telangana', 'Uttar Pradesh', 'Rajasthan'] },
  { id: 3, name: 'Rest of India', states: ['Kerala', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Andhra Pradesh'] },
  { id: 4, name: 'Special Zone', states: ['Jammu and Kashmir', 'Himachal Pradesh', 'Uttarakhand'] },
];

const shippingRates = [
  { id: 1, zoneId: 1, rate: 50, method: 'Standard', deliveryTime: '2-4 days' },
  { id: 2, zoneId: 1, rate: 99, method: 'Express', deliveryTime: '1-2 days' },
  { id: 3, zoneId: 2, rate: 65, method: 'Standard', deliveryTime: '3-5 days' },
  { id: 4, zoneId: 2, rate: 120, method: 'Express', deliveryTime: '2-3 days' },
  { id: 5, zoneId: 3, rate: 80, method: 'Standard', deliveryTime: '5-7 days' },
  { id: 6, zoneId: 4, rate: 150, method: 'Standard', deliveryTime: '7-10 days' },
];

const serviceablePincodes = [
  { pincode: '110001', city: 'New Delhi', state: 'Delhi' },
  { pincode: '400001', city: 'Mumbai', state: 'Maharashtra' },
  { pincode: '560001', city: 'Bangalore', state: 'Karnataka' },
  { pincode: '700001', city: 'Kolkata', state: 'West Bengal' },
  { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu' },
  { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat' },
  { pincode: '500001', city: 'Hyderabad', state: 'Telangana' },
  { pincode: '226001', city: 'Lucknow', state: 'Uttar Pradesh' },
  { pincode: '302001', city: 'Jaipur', state: 'Rajasthan' },
  { pincode: '682011', city: 'Kochi', state: 'Kerala' },
];

const occasions = [
    { id: 1, name: "Confession / “I Love You” letter", category: "Love & Romance", description: "For when your heart is too full to stay silent. Let us help you craft the words that finally express the depths of your feelings." },
    { id: 2, name: "Anniversary Letter", category: "Love & Romance", description: "Celebrate your journey together. Recount your favorite memories, reaffirm your love, and look forward to the chapters yet unwritten." },
    { id: 3, name: "Birthday Letter", category: "Celebrations & Milestones", description: "A gift they'll treasure more than any other. Share memories, wishes, and love in a beautifully personal birthday message." },
    { id: 4, name: "Apology Letter", category: "Emotional Support & Apology", description: "Mend bridges with sincerity. A handwritten apology shows the time and care you're putting into making things right." },
    { id: 5, name: "Friendship Letter", category: "Family & Friendship", description: "Celebrate your chosen family. Tell your best friend exactly what they mean to you in a letter they'll keep forever." },
    { id: 6, name: "Proposal Letter", category: "Love & Romance", description: "A momentous question deserves a momentous medium. Pen a proposal that will become the first heirloom of your life together." },
    { id: 7, name: "Letter to Parents", category: "Family & Friendship", description: "The words we often forget to say. A letter of love, gratitude, and appreciation for the people who gave you everything." },
    { id: 8, name: "Thank You Letter", category: "Formal & Professional", description: "Express your gratitude for their guidance and impact on your life with a polished, professional, and heartfelt note." },
    { id: 9, name: "Vintage-Style Letter", category: "Creative & Custom", description: "Evoke a sense of timeless romance with artificially aged parchment paper and classic calligraphy." }
];

const paperTypes = [
  { id: 1, name: 'Cotton Rag Paper', description: 'Luxurious, soft paper made from cotton fibers. Ideal for premium romantic or anniversary letters.', imageUrl: 'https://images.pexels.com/photos/1089550/pexels-photo-1089550.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, name: 'Handmade Paper', description: 'Rustic, textured, eco-friendly. Perfect for vintage, emotional or keepsake letters.', imageUrl: 'https://images.pexels.com/photos/8962479/pexels-photo-8962479.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, name: 'Linen Texture Paper', description: 'Elegant textured finish that feels premium. Great for romantic, birthday, and professional letters.', imageUrl: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, name: 'Laid Texture Paper', description: 'Classic paper with fine lines. Ideal for vintage style or old-fashioned love letters.', imageUrl: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, name: 'Smooth Bond Paper', description: 'Simple, clean and modern. Best for basic letters, apologies, or formal messages.', imageUrl: 'https://images.pexels.com/photos/261706/pexels-photo-261706.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, name: 'Ivory / Cream Paper', description: 'Warm-toned, elegant paper perfect for family letters and formal occasions.', imageUrl: 'https://images.pexels.com/photos/4210610/pexels-photo-4210610.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 7, name: 'Kraft Brown Paper', description: 'Rustic, earthy and minimal. Great for raw, honest, emotional letter styles.', imageUrl: 'https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 8, name: 'Pastel Colored Paper', description: 'Soft, cute, aesthetic colors. Ideal for friendship, birthday, or cheerful letters.', imageUrl: 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 9, name: 'Metallic / Pearl Finish Paper', description: 'Shiny, premium paper for special occasions like anniversaries, proposals, or weddings.', imageUrl: 'https://images.pexels.com/photos/5418925/pexels-photo-5418925.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 10, name: 'Cardstock', description: 'Thick and durable. Perfect for framed letters or premium gift sets.', imageUrl: 'https://images.pexels.com/photos/6964205/pexels-photo-6964205.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 11, name: 'Vellum (Translucent)', description: 'Frosted transparent sheet used for layering or decorative overlays.', imageUrl: 'https://images.pexels.com/photos/1563604/pexels-photo-1563604.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 12, name: 'Deckle Edge Paper', description: 'Vintage torn-edge look. Ideal for artistic, old-romance style letters.', imageUrl: 'https://images.pexels.com/photos/7608693/pexels-photo-7608693.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const orders = [];
const shipments = [];

const db = {
    products,
    customers,
    paymentMethods,
    coupons,
    writers,
    testimonials,
    orders,
    shipments,
    shippingZones,
    shippingRates,
    serviceablePincodes,
    occasions,
    paperTypes,
};

module.exports = db;