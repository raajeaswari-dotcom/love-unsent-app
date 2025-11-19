
/**
 * Love Unsent - Product Category & Attribute Mapping System
 * 
 * This file serves as the single source of truth for all product-related
 * classifications, attributes, and their relationships.
 */

// 1. Main Categories (with icons for UI)
export const mainCategories = [
    { name: "Love & Romance", icon: '❤️' },
    { name: "Celebrations & Milestones", icon: '🎉' },
    { name: "Family & Friendship", icon: '👨‍👩‍👧‍👦' },
    { name: "Emotional Support & Apology", icon: '💔' },
    { name: "Formal & Professional", icon: '💼' },
    { name: "Creative & Custom", icon: '🎁' }
];

// 2. Sub-Categories
export const subCategories = {
    "Love & Romance": [
        "Romantic Letter",
        "Anniversary Letter",
        "Proposal Letter",
        "Long-Distance Letter",
        "Valentine's Day Letter",
        "\"I Miss You\" Letter"
    ],
    "Family & Friendship": [
        "Family Letter",
        "Friendship Letter",
        "Letter to Parents",
        "Letter to Siblings",
        "Letter to Grandparents"
    ],
    "Celebrations & Milestones": [
        "Birthday Letter",
        "Wedding Day Letter",
        "Graduation Letter",
        "New Job / Promotion Letter",
        "Housewarming Letter"
    ],
    "Emotional Support & Apology": [
        "Apology Letter",
        "Letter of Encouragement",
        "Condolence Letter",
        "Letter for Tough Times"
    ],
    "Formal & Professional": [
        "Thank You Letter (Mentor/Teacher)",
        "Letter of Appreciation (Colleague)",
        "Farewell Letter (Team)"
    ],
    "Creative & Custom": [
        "Custom Letter (User-defined occasion)",
        "Vintage-Style Letter",
        "Time Capsule Letter"
    ]
};

// 3. Paper Quality Levels
export const paperQualityLevels = {
    "Basic Paper": "Standard, quality paper for simple and clean messages.",
    "Premium Paper": "Mid-range papers offering superior texture, feel, and elegance.",
    "Luxury Paper": "Top-tier, exquisite papers for the most special and memorable occasions."
};

// 4. Paper GSM (Thickness) Options
export const gsmOptions = [
    "100–120 GSM (Standard Weight)",
    "120–150 GSM (Premium Weight)",
    "200–250 GSM (Heavy Weight)",
    "300+ GSM (Cardstock Weight)"
];

// 5. Letter Style Options
export const letterStyles = [
    "Vintage",
    "Minimal",
    "Artistic",
    "Rustic",
    "Luxurious"
];

// 6. Paper Color Options
export const paperColors = [
    "White",
    "Ivory",
    "Brown Kraft",
    "Pastel Pink",
    "Pastel Blue",
    "Pastel Lavender",
    "Gold/Silver Pearl"
];

// 7. Paper Type → Quality Mapping
export const paperTypeToQualityMapping = {
    "Luxury Paper": [
        "Cotton Rag Paper",
        "Metallic / Pearl Finish Paper",
        "Deckle Edge Paper"
    ],
    "Premium Paper": [
        "Handmade Paper",
        "Linen Texture Paper",
        "Laid Texture Paper",
        "Ivory / Cream Paper",
        "Cardstock",
        "Vellum (Translucent)"
    ],
    "Basic Paper": [
        "Smooth Bond Paper",
        "Kraft Brown Paper",
        "Pastel Colored Paper"
    ]
};

// 8. Example Product Structure
export const exampleProductStructure = {
  "product_name": "Anniversary Letter",
  "main_category": "Love & Romance",
  "sub_category": "Anniversary Letter",
  "base_price": 1499,
  "variants": {
    "paper_quality": [
      {
        "name": "Basic Paper",
        "price_modifier": 0,
        "available_paper_types": [
          "Smooth Bond Paper",
          "Kraft Brown Paper"
        ]
      },
      {
        "name": "Premium Paper",
        "price_modifier": 200,
        "available_paper_types": [
          "Handmade Paper",
          "Linen Texture Paper",
          "Ivory / Cream Paper"
        ]
      },
      {
        "name": "Luxury Paper",
        "price_modifier": 450,
        "available_paper_types": [
          "Cotton Rag Paper",
          "Metallic / Pearl Finish Paper",
          "Deckle Edge Paper"
        ]
      }
    ],
    "paper_gsm": [
      "120–150 GSM",
      "200–250 GSM"
    ],
    "letter_style": [
      "Vintage",
      "Luxurious",
      "Artistic"
    ],
    "paper_color": [
      "White",
      "Ivory",
      "Gold/Silver Pearl"
    ]
  }
};
