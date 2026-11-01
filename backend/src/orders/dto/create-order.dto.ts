export class CreateOrderDto {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zone: string;
    postalCode: string;
    deliveryNotes?: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
    colorName: string;
    sizeLabel: string;
    price: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'CASH_ON_DELIVERY' | 'BKASH_NAGAD' | 'CREDIT_CARD';
  paymentStatus: 'PAID' | 'PENDING';
}
