import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review, Order, Coupon, UserAccount, CategorySlug } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, AVAILABLE_COUPONS } from '../data/products';

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'account' 
  | 'about' 
  | 'contact' 
  | 'admin';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  // Navigation & Views
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  selectedCategory: CategorySlug | 'all';
  setSelectedCategory: (category: CategorySlug | 'all') => void;
  
  // Search & Modals
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Products Data & Admin Modifiers
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Cart Logic
  cart: CartItem[];
  addToCart: (product: Product, size?: string, finish?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  
  // Coupon Logic
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  
  // Wishlist Logic
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Recently Viewed
  recentlyViewed: Product[];
  
  // Orders & Checkout
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
  
  // User Account
  user: UserAccount | null;
  updateUserAccount: (userData: Partial<UserAccount>) => void;
  
  // Toast notifications
  toasts: ToastState[];
  showToast: (message: string, type?: ToastState['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'aura_jewellery_cart_v1';
const LOCAL_STORAGE_WISHLIST_KEY = 'aura_jewellery_wishlist_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'aura_jewellery_orders_v1';
const LOCAL_STORAGE_PRODUCTS_KEY = 'aura_jewellery_products_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('aura-001');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Products state (persisted or defaults)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'aura-001-5-18K Yellow Gold',
          product: INITIAL_PRODUCTS[0],
          selectedSize: '6',
          selectedFinish: '18K Yellow Gold',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1]];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Recently Viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[2]]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-1001',
          orderNumber: 'AURA-2026-8942',
          date: '2026-08-01',
          items: [
            {
              productId: INITIAL_PRODUCTS[0].id,
              name: INITIAL_PRODUCTS[0].name,
              image: INITIAL_PRODUCTS[0].images[0],
              size: '6',
              finish: '18K Yellow Gold',
              price: INITIAL_PRODUCTS[0].price,
              quantity: 1
            }
          ],
          subtotal: 89999,
          discount: 2500,
          shipping: 0,
          total: 87499,
          status: 'Shipped',
          trackingNumber: 'AWB987213401IN',
          shippingAddress: {
            fullName: 'Ananya Roy',
            phone: '+91 98765 43210',
            email: 'ananya.roy@example.com',
            street: '402, Sea Breeze Heights, Worli Sea Face',
            city: 'Mumbai',
            state: 'Maharashtra',
            pinCode: '400030',
            landmark: 'Near Worli Dairy'
          },
          paymentMethod: 'UPI',
          paymentStatus: 'Paid',
          estimatedDelivery: '2026-08-14'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(orders[0] || null);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(AVAILABLE_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // User
  const [user, setUser] = useState<UserAccount | null>({
    name: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    phone: '+91 98765 43210',
    savedAddresses: [
      {
        fullName: 'Ananya Roy',
        phone: '+91 98765 43210',
        email: 'ananya.roy@example.com',
        street: '402, Sea Breeze Heights, Worli Sea Face',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400030',
        landmark: 'Near Worli Dairy'
      }
    ]
  });

  // Toast Helper
  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product Navigation Helper
  const openProductDetail = (productId: string) => {
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      setSelectedProductId(productId);
      setActiveView('product');
      // Add to recently viewed
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((item) => item.id !== productId);
        return [p, ...filtered].slice(0, 6);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart Operations
  const addToCart = (product: Product, size?: string, finish?: string, quantity: number = 1) => {
    const selectedSize = size || product.sizes[0] || 'Standard';
    const selectedFinish = finish || product.finishOptions[0] || product.material;
    const cartItemId = `${product.id}-${selectedSize}-${selectedFinish}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize,
            selectedFinish,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minPurchase) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartShipping = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 499;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Coupon apply
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Coupon requires a minimum order of ₹${found.minPurchase.toLocaleString('en-IN')}.`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied!`, 'success');
    return { success: true, message: 'Coupon applied successfully.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`New coupon "${coupon.code}" created!`, 'success');
  };

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Admin Modifiers
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`New product "${newProd.name}" added to store`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // Order Placement
  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>
  ): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `AURA-2026-${randomSuffix}`;
    const awb = `AWB${Math.floor(100000000 + Math.random() * 900000000)}IN`;
    const today = new Date().toISOString().split('T')[0];

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 4);
    const estDeliveryStr = estDate.toISOString().split('T')[0];

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: today,
      status: 'Placed',
      trackingNumber: awb,
      estimatedDelivery: estDeliveryStr,
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setActiveView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Order placed successfully!', 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order status updated to "${status}"`, 'success');
  };

  // Review add
  const addReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    showToast('Thank you! Your review has been submitted.', 'success');
  };

  // User profile
  const updateUserAccount = (userData: Partial<UserAccount>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : (userData as UserAccount)));
    showToast('Profile updated', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        openProductDetail,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        orders,
        currentOrder,
        placeOrder,
        updateOrderStatus,
        reviews,
        addReview,
        user,
        updateUserAccount,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
