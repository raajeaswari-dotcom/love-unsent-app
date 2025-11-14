
const bcrypt = require('bcryptjs');

const products = [
  { 
    name: "CLASSIC", 
    price: 1499, 
    description: "Pour your heart onto paper with our timeless Classic Letter.", 
    imageUrl: "https://images.pexels.com/photos/4207783/pexels-photo-4207783.jpeg?auto=compress&cs=tinysrgb&w=800", 
    sku: "LU-CLS-001", 
    stock: 50, 
    category: "Classic Letters", 
    gstRate: 12, 
    hsnCode: "49090010",
    availablePaperTypeIds: [], // This will be populated by the seeder
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
  { name: "OPEN WHEN", price: 1999, description: "A timeless bundle of sealed letters to be opened at just the right moment.", imageUrl: "https://images.pexels.com/photos/7174415/pexels-photo-7174415.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-OPW-001", stock: 35, category: "Letter Bundles", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [] },
  { name: "UNSENT", price: 1199, description: "A space to express your deepest thoughts and feelings without the pressure of sending them.", imageUrl: "https://images.pexels.com/photos/4145146/pexels-photo-4145146.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-UNS-001", stock: 100, category: "Personal Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [] },
  { name: "P.S. I LOVE YOU", price: 1499, description: "Three simple words, a universe of meaning.", imageUrl: "https://images.pexels.com/photos/669578/pexels-photo-669578.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-PSL-001", stock: 0, category: "Romantic Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [] },
  { name: "GOOD BYE WITH LOVE", price: 1499, description: "Saying goodbye is never easy, but it can be done with grace and love.", imageUrl: "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-GBW-001", stock: 20, category: "Sentimental Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [] },
  { name: "WORDS OF WISDOM", price: 1499, description: "Share the lessons you've learned, the advice you hold dear.", imageUrl: "https://images.pexels.com/photos/6231819/pexels-photo-6231819.jpeg?auto=compress&cs=tinysrgb&w=800", sku: "LU-WOW-001", stock: 42, category: "Guidance Letters", gstRate: 12, hsnCode: "49090010", availablePaperTypeIds: [] }
];

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('admin', salt);

const admins = [
    {
        name: 'Admin User',
        email: 'admin@loveunsent.com',
        password: hashedPassword,
    }
];

const testimonials = [
    { quote: "The most beautiful gift I've ever received. The letter was pure art and emotion.", author: "Anjali P." },
    { quote: "I was speechless. It felt like the words were taken right from my heart. Thank you, Love Unsent.", author: "Vikram S." },
    { quote: "Absolutely stunning. The craftsmanship, the paper, the handwritten words... everything was perfect.", author: "Priya K." },
    { quote: "A truly unique and personal gift. The AI helper was surprisingly good at capturing my feelings.", author: "Rohan M." },
];

const occasions = [
    { name: "Confession / “I Love You” letter", category: "Love & Romance", description: "For when your heart is too full to stay silent. Let us help you craft the words that finally express the depths of your feelings." },
    { name: "Anniversary Letter", category: "Love & Romance", description: "Celebrate your journey together. Recount your favorite memories, reaffirm your love, and look forward to the chapters yet unwritten." },
    { name: "Birthday Letter", category: "Celebrations & Milestones", description: "A gift they'll treasure more than any other. Share memories, wishes, and love in a beautifully personal birthday message." },
    { name: "Apology Letter", category: "Emotional Support & Apology", description: "Mend bridges with sincerity. A handwritten apology shows the time and care you're putting into making things right." },
    { name: "Friendship Letter", category: "Family & Friendship", description: "Celebrate your chosen family. Tell your best friend exactly what they mean to you in a letter they'll keep forever." },
];

const paperTypes = [
  { name: 'Cotton Rag Paper', description: 'Luxurious, soft paper made from cotton fibers. Ideal for premium romantic or anniversary letters.', imageUrl: 'https://images.pexels.com/photos/1089550/pexels-photo-1089550.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Handmade Paper', description: 'Rustic, textured, eco-friendly. Perfect for vintage, emotional or keepsake letters.', imageUrl: 'https://images.pexels.com/photos/8962479/pexels-photo-8962479.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Linen Texture Paper', description: 'Elegant textured finish that feels premium. Great for romantic, birthday, and professional letters.', imageUrl: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Laid Texture Paper', description: 'Classic paper with fine lines. Ideal for vintage style or old-fashioned love letters.', imageUrl: 'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Smooth Bond Paper', description: 'Simple, clean and modern. Best for basic letters, apologies, or formal messages.', imageUrl: 'https://images.pexels.com/photos/261706/pexels-photo-261706.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

module.exports = { products, admins, testimonials, occasions, paperTypes };
