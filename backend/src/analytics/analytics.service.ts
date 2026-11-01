import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService
  ) {}

  getExecutiveMetrics() {
    const ordersResult = this.ordersService.findAll();
    const productsResult = this.productsService.findAll({});

    const totalRevenue = ordersResult.orders.reduce((sum, o) => sum + o.total, 0);

    return {
      success: true,
      data: {
        totalRevenue,
        ordersCount: ordersResult.orders.length,
        skusCount: productsResult.products.length,
        demographics: {
          men: 38,
          women: 34,
          wearables: 20,
          children: 8,
        },
        topFabrics: [
          { name: 'Pure European Linen', percentage: 42 },
          { name: '100% GOTS Organic Cotton', percentage: 28 },
          { name: 'Mulberry Silk & Dhakai Muslin', percentage: 18 },
          { name: 'Italian Leather & 316L Horology', percentage: 12 },
        ],
      },
    };
  }
}
