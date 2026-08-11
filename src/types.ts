export type CategorySlug = 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'bangles' 
  | 'bridal' 
  | 'personalized';

export type ProductBadge = 'New' | 'Bestseller' | 'Limited' | 'Featured' | 'Sale';

export type MaterialType = 
  | '18K Yellow Gold' 
  | '18K Rose Gold' 
  | '18K White Gold' 
  | '22K Yellow Gold' 
  | 'Platinum' 
  | '925 Sterling Silver';

export type GemstoneType = 
  | 'VVS Diamond' 
  | 'Zambian Emerald' 
  | 'Ceylon Sapphire' 
  | 'Freshwater Pearl' 
  | 'Moissanite' 
  | 'Burmese Ruby' 
  | 'None';

export interface ProductSpecification {
  purity: string;
  grossWeight: string;
  netWeight?: string;
  diamondCarat?: string;
  diamondClarity?: string;
  certification: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: ProductBadge;
  description: string;
  material: MaterialType;
  gemstone: GemstoneType;
  sizes: string[];
  finishOptions: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  specifications: ProductSpecification;
  tags: string[];
  sku: string;
}

export interface CartItem {
  id: string; // unique identifier (productId + size + finish)
  product: Product;
  selectedSize: string;
  selectedFinish: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  itemCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  finish: string;
  price: number;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  landmark?: string;
}

export type PaymentMethod = 'UPI' | 'CARDS' | 'NET_BANKING' | 'COD';

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  trackingNumber: string;
  shippingAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'COD Authorized';
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 2000 for ₹2000
  minPurchase: number;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  savedAddresses: DeliveryAddress[];
}
