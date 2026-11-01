import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, ColorVariant, Order, OrderStatus, Product, SizeMeasurement } from '@/types/commerce';
import { SEED_PRODUCTS } from '@/data/seedProducts';
import { generateOrderNumber } from '@/lib/utils';

interface CommerceState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  orders: Order[];
  unit: 'INCH' | 'CM';
  currency: 'BDT' | 'USD';
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;

  // Actions
  setUnit: (unit: 'INCH' | 'CM') => void;
  setCurrency: (currency: 'BDT' | 'USD') => void;
  toggleCart: (open?: boolean) => void;
  toggleWishlist: (open?: boolean) => void;
  toggleSearch: (open?: boolean) => void;

  // Cart operations
  addToCart: (product: Product, color: ColorVariant, size: SizeMeasurement, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist operations
  toggleWishlistProduct: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, sizeLabel?: string) => void;

  // Product management (Admin & Client sync)
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline' | 'estimatedDelivery'> & { estimatedDelivery?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "AUR-2603-9482",
    items: [
      {
        id: "prod-men-linen-shirt-Ecru Alabaster-M",
        product: SEED_PRODUCTS[0],
        selectedColor: SEED_PRODUCTS[0].colorVariants[0],
        selectedSize: SEED_PRODUCTS[0].sizes[1],
        quantity: 1,
      },
      {
        id: "prod-watch-chronograph-auto-Brushed Steel & Obsidian-40mm Case (Standard)",
        product: SEED_PRODUCTS[14],
        selectedColor: SEED_PRODUCTS[14].colorVariants[0],
        selectedSize: SEED_PRODUCTS[14].sizes[0],
        quantity: 1,
      }
    ],
    customer: {
      fullName: "Tahmid Rahman",
      email: "tahmid.rahman@studio.design",
      phone: "+880 1711 982341",
      address: "House 42, Road 11, Block D, Banani",
      city: "Dhaka",
      zone: "DHAKA_METRO",
      postalCode: "1213",
      deliveryNotes: "Call upon arrival at security gate",
    },
    subtotal: 20350,
    shippingFee: 0,
    total: 20350,
    paymentMethod: "BKASH_NAGAD",
    paymentStatus: "PAID",
    orderStatus: "SHIPPED",
    createdAt: "2026-03-23T14:20:00Z",
    estimatedDelivery: "2026-03-25T18:00:00Z",
    timeline: [
      {
        status: "PENDING",
        timestamp: "2026-03-23T14:20:00Z",
        note: "Order placed online via bKash Merchant Gateway",
      },
      {
        status: "CONFIRMED",
        timestamp: "2026-03-23T15:00:00Z",
        note: "Payment verified & allocated to inventory",
      },
      {
        status: "PACKED",
        timestamp: "2026-03-24T09:30:00Z",
        note: "Carefully wrapped in unbleached tissue & bespoke linen packaging",
      },
      {
        status: "SHIPPED",
        timestamp: "2026-03-24T14:00:00Z",
        note: "Dispatched with Dhaka Metro Express Courier (Tracking: DHK-8891)",
      }
    ],
  },
  {
    id: "ord-1002",
    orderNumber: "AUR-2603-8120",
    items: [
      {
        id: "prod-women-muslin-saree-Raw Silk Ecru-5.5M Standard",
        product: SEED_PRODUCTS[5],
        selectedColor: SEED_PRODUCTS[5].colorVariants[0],
        selectedSize: SEED_PRODUCTS[5].sizes[0],
        quantity: 1,
      }
    ],
    customer: {
      fullName: "Nusrat Jahan",
      email: "nusrat.atelier@gmail.com",
      phone: "+880 1819 443210",
      address: "Apartment 7B, Green Valley, Sector 3, Uttara",
      city: "Dhaka",
      zone: "DHAKA_METRO",
      postalCode: "1230",
    },
    subtotal: 12500,
    shippingFee: 0,
    total: 12500,
    paymentMethod: "CREDIT_CARD",
    paymentStatus: "PAID",
    orderStatus: "PACKED",
    createdAt: "2026-03-24T10:15:00Z",
    estimatedDelivery: "2026-03-26T18:00:00Z",
    timeline: [
      {
        status: "PENDING",
        timestamp: "2026-03-24T10:15:00Z",
        note: "Order confirmed via Visa Platinum",
      },
      {
        status: "CONFIRMED",
        timestamp: "2026-03-24T10:30:00Z",
        note: "Handloom quality certification verified",
      },
      {
        status: "PACKED",
        timestamp: "2026-03-24T16:00:00Z",
        note: "Heirloom garment boxed in wooden keepsake presentation box",
      }
    ],
  }
];

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      products: SEED_PRODUCTS,
      cart: [],
      wishlist: ["prod-men-linen-shirt", "prod-watch-chronograph-auto"],
      orders: INITIAL_SAMPLE_ORDERS,
      unit: 'INCH',
      currency: 'BDT',
      isCartOpen: false,
      isWishlistOpen: false,
      isSearchOpen: false,

      setUnit: (unit) => set({ unit }),
      setCurrency: (currency) => set({ currency }),
      toggleCart: (open) =>
        set((state) => ({ isCartOpen: open !== undefined ? open : !state.isCartOpen })),
      toggleWishlist: (open) =>
        set((state) => ({ isWishlistOpen: open !== undefined ? open : !state.isWishlistOpen })),
      toggleSearch: (open) =>
        set((state) => ({ isSearchOpen: open !== undefined ? open : !state.isSearchOpen })),

      // Cart
      addToCart: (product, color, size, quantity = 1) => {
        set((state) => {
          const itemId = `${product.id}-${color.colorName}-${size.sizeLabel}`;
          const existing = state.cart.find((i) => i.id === itemId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                id: itemId,
                product,
                selectedColor: color,
                selectedSize: size,
                quantity,
              },
            ],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // Wishlist
      toggleWishlistProduct: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        });
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      moveToCartFromWishlist: (productId, sizeLabel) => {
        const product = get().products.find((p) => p.id === productId);
        if (!product) return;
        const color = product.colorVariants[0];
        const size = sizeLabel
          ? product.sizes.find((s) => s.sizeLabel === sizeLabel) || product.sizes[0]
          : product.sizes[0];

        get().addToCart(product, color, size, 1);
        get().toggleWishlistProduct(productId);
      },

      // Product Management
      addProduct: (newProduct) => {
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },

      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      // Orders
      createOrder: (orderData) => {
        const id = `ord-${Date.now()}`;
        const orderNumber = generateOrderNumber();
        const now = new Date().toISOString();
        const estDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

        const newOrder: Order = {
          ...orderData,
          id,
          orderNumber,
          createdAt: now,
          estimatedDelivery: estDelivery,
          timeline: [
            {
              status: orderData.orderStatus || 'PENDING',
              timestamp: now,
              note: 'Order confirmed and registered in Aurelia fulfillment queue.',
            },
          ],
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [], // Empty bag upon successful checkout
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status, note) => {
        const timestamp = new Date().toISOString();
        const defaultNote =
          status === 'CONFIRMED'
            ? 'Order verified and authorized for preparation.'
            : status === 'PACKED'
            ? 'Garment packaged in custom atelier boxing with inspection seal.'
            : status === 'SHIPPED'
            ? 'Dispatched to domestic courier distribution hub.'
            : status === 'DELIVERED'
            ? 'Delivered to recipient address.'
            : status === 'CANCELLED'
            ? 'Order cancelled by customer or administrator.'
            : 'Order status updated.';

        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order;
            return {
              ...order,
              orderStatus: status,
              timeline: [
                ...order.timeline,
                {
                  status,
                  timestamp,
                  note: note || defaultNote,
                },
              ],
            };
          }),
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find(
          (o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase()
        );
      },
    }),
    {
      name: 'aurelia-atelier-commerce-v1',
      storage: createJSONStorage(() => localStorage),
      // Merge with seed products if storage is empty
      onRehydrateStorage: () => (state) => {
        if (state && (!state.products || state.products.length === 0)) {
          state.products = SEED_PRODUCTS;
        }
      },
    }
  )
);
