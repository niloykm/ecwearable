import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    CloudinaryModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
