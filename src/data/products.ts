import { Product, CategoryItem, Review, Coupon } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-rings',
    name: 'Rings',
    slug: 'rings',
    description: 'Solitaires, cocktail bands, & handcrafted diamond rings.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    itemCount: 24
  },
  {
    id: 'cat-necklaces',
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Chokers, pendant chains, and opulent statement necklaces.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 18
  },
  {
    id: 'cat-earrings',
    name: 'Earrings',
    slug: 'earrings',
    description: 'Studs, drop earrings, and diamond hoops.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: 32
  },
  {
    id: 'cat-bracelets',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Delicate tennis bracelets and sleek modern cuffs.',
    image: 'https://images.unsplash.com/photo-1611591475161-d7efd688cf64?auto=format&fit=crop&w=800&q=80',
    itemCount: 15
  },
  {
    id: 'cat-bangles',
    name: 'Bangles',
    slug: 'bangles',
    description: 'Hand-carved gold & gemstone encrusted bangles.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    itemCount: 12
  },
  {
    id: 'cat-bridal',
    name: 'Bridal Jewellery',
    slug: 'bridal',
    description: 'Timeless heirloom sets designed for your special day.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    itemCount: 20
  },
  {
    id: 'cat-personalized',
    name: 'Personalized Jewellery',
    slug: 'personalized',
    description: 'Engraved lockets, initial pendants & bespoke creations.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    itemCount: 16
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aura-001',
    name: 'The Celestia Solitaire Diamond Ring',
    subtitle: '1.5 Carat VVS1 Round Brilliant Diamond in 18K Yellow Gold',
    category: 'rings',
    categoryName: 'Rings',
    price: 89999,
    originalPrice: 105000,
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Bestseller',
    description: 'An iconic solitaire ring featuring a hand-selected VVS1 clarity brilliant cut diamond set in a precision four-prong 18K gold band. Crafted to capture light from every angle with breathtaking sparkle.',
    material: '18K Yellow Gold',
    gemstone: 'VVS Diamond',
    sizes: ['5', '6', '7', '8', '9'],
    finishOptions: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    inStock: true,
    isBestseller: true,
    isFeatured: true,
    specifications: {
      purity: '18K / 750 Yellow Gold',
      grossWeight: '4.85 g',
      diamondCarat: '1.50 Ct',
      diamondClarity: 'VVS1 - E Color',
      certification: 'SGL & IGI Certified'
    },
    tags: ['solitaire', 'diamond', 'ring', 'wedding', 'engagement'],
    sku: 'AUR-RNG-001'
  },
  {
    id: 'aura-002',
    name: 'Royal Emerald Empress Pendant Necklace',
    subtitle: 'Natural Zambian Emerald framed with Round Diamond Halo',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 124999,
    originalPrice: 140000,
    rating: 5.0,
    reviewCount: 32,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475161-d7efd688cf64?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Limited',
    description: 'Inspired by royal heritage, this captivating necklace centers an exquisite deep-green Zambian emerald encircled by a halo of micro-pave diamonds on an adjustable 18-inch gold chain.',
    material: '18K Yellow Gold',
    gemstone: 'Zambian Emerald',
    sizes: ['16 inch', '18 inch', '20 inch'],
    finishOptions: ['18K Yellow Gold', '18K White Gold'],
    inStock: true,
    isBestseller: true,
    isFeatured: true,
    specifications: {
      purity: '18K Hallmarked Gold',
      grossWeight: '8.20 g',
      diamondCarat: '0.85 Ct',
      diamondClarity: 'VVS - VS',
      certification: 'GIA & IGI Certified'
    },
    tags: ['emerald', 'necklace', 'pendant', 'royal', 'luxury'],
    sku: 'AUR-NCK-002'
  },
  {
    id: 'aura-003',
    name: 'Lumière Diamond Drop Earrings',
    subtitle: 'Cascading Marquis & Round Diamond Drop Earrings in Platinum',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 64999,
    originalPrice: 72000,
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'New',
    description: 'Gracefully designed to catch ambient light with fluid motion. Each Marquis diamond is individually articulated to provide maximum shimmer during red-carpet evenings.',
    material: 'Platinum',
    gemstone: 'VVS Diamond',
    sizes: ['Standard'],
    finishOptions: ['Platinum', '18K Rose Gold'],
    inStock: true,
    isNewArrival: true,
    isFeatured: true,
    specifications: {
      purity: '950 Platinum',
      grossWeight: '6.40 g',
      diamondCarat: '1.20 Ct',
      certification: 'SGL Certified'
    },
    tags: ['drop earrings', 'platinum', 'diamond', 'red carpet'],
    sku: 'AUR-EAR-003'
  },
  {
    id: 'aura-004',
    name: 'Eternity Diamond Tennis Bracelet',
    subtitle: '3.0 Carat Continuous Prong-Set Diamond Bracelet',
    category: 'bracelets',
    categoryName: 'Bracelets',
    price: 149999,
    originalPrice: 175000,
    rating: 4.9,
    reviewCount: 54,
    images: [
      'https://images.unsplash.com/photo-1611591475161-d7efd688cf64?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Bestseller',
    description: 'The ultimate staple of effortless luxury. Featuring a continuous line of brilliant round diamonds securely held in 18K white gold with a dual-locking safety clasp.',
    material: '18K White Gold',
    gemstone: 'VVS Diamond',
    sizes: ['6.5 inch', '7.0 inch', '7.5 inch'],
    finishOptions: ['18K White Gold', '18K Yellow Gold', '18K Rose Gold'],
    inStock: true,
    isBestseller: true,
    isFeatured: true,
    specifications: {
      purity: '18K White Gold',
      grossWeight: '12.80 g',
      diamondCarat: '3.00 Ct',
      certification: 'IGI Certified'
    },
    tags: ['tennis bracelet', 'diamond', 'white gold', 'classic'],
    sku: 'AUR-BRC-004'
  },
  {
    id: 'aura-005',
    name: 'AURA Heritage Kundan & Polki Bridal Set',
    subtitle: '22K Gold Hand-crafted Choker with South Sea Pearls',
    category: 'bridal',
    categoryName: 'Bridal Jewellery',
    price: 349999,
    originalPrice: 389000,
    rating: 5.0,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Limited',
    description: 'An extraordinary heirloom bridal set handcrafted by master artisans over 120 hours. Features uncut Polki diamonds, hand-enamelled Meenakari back detail, and natural South Sea pearl droplets.',
    material: '22K Yellow Gold',
    gemstone: 'Burmese Ruby',
    sizes: ['Adjustable Choker + Earrings Set'],
    finishOptions: ['22K Yellow Gold'],
    inStock: true,
    isFeatured: true,
    specifications: {
      purity: '22K / 916 BIS Hallmarked Gold',
      grossWeight: '84.50 g',
      netWeight: '62.10 g',
      certification: 'BIS 916 Hallmarked & Artisan Certificate'
    },
    tags: ['bridal', 'kundan', 'polki', 'royal wedding', 'heirloom'],
    sku: 'AUR-BRD-005'
  },
  {
    id: 'aura-006',
    name: 'Seraphina Ruby & Diamond Cocktail Ring',
    subtitle: 'Unheated Burmese Ruby flanked by Tapered Baguettes',
    category: 'rings',
    categoryName: 'Rings',
    price: 78999,
    originalPrice: 88000,
    rating: 4.7,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'New',
    description: 'A striking statement cocktail ring showcasing a fiery natural pigeon-blood Burmese ruby cradled between two architectural tapered baguette diamonds.',
    material: '18K Rose Gold',
    gemstone: 'Burmese Ruby',
    sizes: ['5', '6', '7', '8'],
    finishOptions: ['18K Rose Gold', '18K Yellow Gold'],
    inStock: true,
    isNewArrival: true,
    specifications: {
      purity: '18K Rose Gold',
      grossWeight: '5.20 g',
      diamondCarat: '0.45 Ct',
      certification: 'GIA Ruby Origin Report'
    },
    tags: ['ruby', 'cocktail ring', 'rose gold', 'gemstone'],
    sku: 'AUR-RNG-006'
  },
  {
    id: 'aura-007',
    name: 'Bespoke Initial Locket Pendant',
    subtitle: 'Custom Engraved 18K Solid Gold Locket with Diamond Accent',
    category: 'personalized',
    categoryName: 'Personalized Jewellery',
    price: 38999,
    originalPrice: 45000,
    rating: 4.9,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Bestseller',
    description: 'A cherished keepsake designed for eternity. Personalize with your initials, secret date, or custom inscription inside a vintage-inspired hinged gold locket.',
    material: '18K Yellow Gold',
    gemstone: 'VVS Diamond',
    sizes: ['18 inch Chain'],
    finishOptions: ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    inStock: true,
    isBestseller: true,
    specifications: {
      purity: '18K Hallmarked Gold',
      grossWeight: '7.10 g',
      certification: 'BIS Hallmarked'
    },
    tags: ['engraved', 'locket', 'initial', 'personalized', 'gift'],
    sku: 'AUR-PRZ-007'
  },
  {
    id: 'aura-008',
    name: 'Imperial Sapphire Halo Stud Earrings',
    subtitle: 'Deep Royal Blue Ceylon Sapphires with Round Brilliant Halo',
    category: 'earrings',
    categoryName: 'Earrings',
    price: 52999,
    originalPrice: 60000,
    rating: 4.8,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Featured',
    description: 'Showcasing the legendary deep blue intensity of untreated Ceylon sapphires encircled by a luminous pave halo of round diamonds in white gold.',
    material: '18K White Gold',
    gemstone: 'Ceylon Sapphire',
    sizes: ['Standard Screw Back'],
    finishOptions: ['18K White Gold', '18K Yellow Gold'],
    inStock: true,
    isFeatured: true,
    specifications: {
      purity: '18K White Gold',
      grossWeight: '4.90 g',
      diamondCarat: '0.60 Ct',
      certification: 'SGL Certified'
    },
    tags: ['sapphire', 'stud earrings', 'blue', 'halo'],
    sku: 'AUR-EAR-008'
  },
  {
    id: 'aura-009',
    name: 'Artisan Carved Gold Temple Bangle',
    subtitle: '22K Solid Gold Hand-Engraved Openable Bangle with Rubies',
    category: 'bangles',
    categoryName: 'Bangles',
    price: 112999,
    originalPrice: 125000,
    rating: 4.9,
    reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475161-d7efd688cf64?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Limited',
    description: 'Intricately hand-carved with traditional flora motifs by South Indian master goldsmiths. Features a hidden push-lock mechanism with double security latch.',
    material: '22K Yellow Gold',
    gemstone: 'Burmese Ruby',
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    finishOptions: ['22K Yellow Gold'],
    inStock: true,
    specifications: {
      purity: '22K / 916 BIS Hallmarked',
      grossWeight: '28.50 g',
      certification: 'BIS 916 Certificate'
    },
    tags: ['bangle', 'temple gold', 'traditional', 'handcrafted'],
    sku: 'AUR-BNG-009'
  },
  {
    id: 'aura-010',
    name: 'Ocean Pearl & Diamond Choker Necklace',
    subtitle: 'Lustrous Tahitian & South Sea Cultured Pearls with Diamond Spacers',
    category: 'necklaces',
    categoryName: 'Necklaces',
    price: 95999,
    originalPrice: 110000,
    rating: 4.8,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'New',
    description: 'A harmonious blend of iridescent freshwater pearls strung with 18K gold and diamond rondelle accents. A modern tribute to timeless grace.',
    material: '18K Yellow Gold',
    gemstone: 'Freshwater Pearl',
    sizes: ['16 inch Choker'],
    finishOptions: ['18K Yellow Gold'],
    inStock: true,
    isNewArrival: true,
    specifications: {
      purity: '18K Yellow Gold Clasp',
      grossWeight: '32.10 g',
      certification: 'Authentic Pearl Valuation'
    },
    tags: ['pearl', 'choker', 'necklace', 'modern elegance'],
    sku: 'AUR-NCK-010'
  },
  {
    id: 'aura-011',
    name: 'Aura Minimalist Diamond Stacking Band',
    subtitle: 'Micro-Pave Round Diamonds on Slim 18K Yellow Gold Band',
    category: 'rings',
    categoryName: 'Rings',
    price: 24999,
    originalPrice: 28000,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'Bestseller',
    description: 'Designed to wear alone for effortless daily glam or stacked alongside engagement rings and solitaire bands.',
    material: '18K Yellow Gold',
    gemstone: 'VVS Diamond',
    sizes: ['5', '6', '7', '8', '9'],
    finishOptions: ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'],
    inStock: true,
    isBestseller: true,
    specifications: {
      purity: '18K Gold',
      grossWeight: '2.10 g',
      diamondCarat: '0.25 Ct',
      certification: 'SGL Certified'
    },
    tags: ['stacking ring', 'minimalist', 'daily wear', 'gold band'],
    sku: 'AUR-RNG-011'
  },
  {
    id: 'aura-012',
    name: 'Monogram Birthstone Nameplate Bracelet',
    subtitle: 'Custom Nameplate with Accent Birthstone in 18K Gold',
    category: 'personalized',
    categoryName: 'Personalized Jewellery',
    price: 29999,
    originalPrice: 34000,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475161-d7efd688cf64?auto=format&fit=crop&w=1000&q=80'
    ],
    badge: 'New',
    description: 'Customize with your name or loved one’s initial featuring a delicate accent gemstone corresponding to your birth month.',
    material: '18K Yellow Gold',
    gemstone: 'Moissanite',
    sizes: ['6.0 inch + 1.5 inch Extension'],
    finishOptions: ['18K Yellow Gold', '18K Rose Gold', '925 Sterling Silver'],
    inStock: true,
    isNewArrival: true,
    specifications: {
      purity: '18K Gold',
      grossWeight: '3.80 g',
      certification: 'BIS Hallmarked'
    },
    tags: ['personalized', 'bracelet', 'nameplate', 'gift idea'],
    sku: 'AUR-PRZ-012'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Ananya Roy',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'Breathtaking Craftsmanship!',
    comment: 'I ordered the Celestia Solitaire ring for my 5th wedding anniversary. The brilliance of the diamond and the gold weight exceeded my expectations. The packaging felt like opening a box from Paris!',
    date: '2026-07-28',
    verifiedPurchase: true,
    productName: 'The Celestia Solitaire Diamond Ring',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    customerName: 'Karan Malhotra',
    location: 'New Delhi',
    rating: 5,
    title: 'Exquisite Emerald Pendant',
    comment: 'Gifted the Zambian Emerald necklace to my wife. The color clarity is outstanding and BIS hallmarking gave me total peace of mind. Delivery was prompt and fully insured.',
    date: '2026-08-02',
    verifiedPurchase: true,
    productName: 'Royal Emerald Empress Pendant Necklace',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    customerName: 'Meera & Siddharth',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Perfection for our Wedding',
    comment: 'The Heritage Kundan & Polki Bridal set was the star of my wedding ceremony. Endless compliments from guests! Truly heirloom quality.',
    date: '2026-07-15',
    verifiedPurchase: true,
    productName: 'AURA Heritage Kundan & Polki Bridal Set',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-4',
    customerName: 'Priya Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    title: 'Daily Luxe Essential',
    comment: 'The Diamond Tennis Bracelet fits like a dream! Sleek, strong safety clasp, and shines beautifully in sun and indoor lighting.',
    date: '2026-08-05',
    verifiedPurchase: true,
    productName: 'Eternity Diamond Tennis Bracelet',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SPARKLE10',
    description: 'Get 10% instant discount on orders above ₹20,000',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 20000
  },
  {
    code: 'AURA2026',
    description: 'Flat ₹2,500 off on fine gold & diamond jewelry',
    discountType: 'fixed',
    discountValue: 2500,
    minPurchase: 30000
  },
  {
    code: 'BRIDAL15',
    description: '15% Off on Bridal & Emerald Collections',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 100000
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    likes: '2.4k',
    handle: '@aura.jewellery',
    caption: 'Golden hours made memorable. Featuring our Heritage Polki Bridal Choker.'
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    likes: '1.9k',
    handle: '@aura.jewellery',
    caption: 'A whisper of diamond brilliance. The Celestia Solitaire ring.'
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    likes: '3.1k',
    handle: '@aura.jewellery',
    caption: 'Zambian emeralds catching the evening twilight. Crafted with perfection.'
  },
  {
    id: 'insta-4',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    likes: '1.5k',
    handle: '@aura.jewellery',
    caption: 'Marquis drops for red carpet nights. Step into luxury.'
  }
];
