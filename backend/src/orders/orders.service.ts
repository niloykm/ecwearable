import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private orders: any[] = [];

  findAll() {
    return { success: true, orders: this.orders };
  }

  findById(id: string) {
    const order = this.orders.find(
      (o) => o.id === id || o.orderNumber.toLowerCase() === id.toLowerCase()
    );
    if (!order) {
      throw new NotFoundException(`Order with identifier ${id} not found`);
    }
    return { success: true, order };
  }

  create(dto: CreateOrderDto) {
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `AUR-${year}${month}-${random}`;
    const now = new Date().toISOString();

    const newOrder = {
      ...dto,
      id: `ord-${Date.now()}`,
      orderNumber,
      orderStatus: 'CONFIRMED',
      createdAt: now,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      timeline: [
        {
          status: 'CONFIRMED',
          timestamp: now,
          note: 'Order confirmed and logged in central fulfillment ledger.',
        },
      ],
    };

    this.orders.unshift(newOrder);
    return { success: true, order: newOrder };
  }

  updateStatus(id: string, status: string, note?: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    order.orderStatus = status;
    order.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status transitioned to ${status}`,
    });

    return { success: true, order };
  }
}
