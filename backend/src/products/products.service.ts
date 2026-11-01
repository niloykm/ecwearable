import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: any[] = [];

  findAll(query: any) {
    let result = [...this.products];

    if (query.gender) {
      result = result.filter((p) => p.gender === query.gender);
    }
    if (query.mainCategory) {
      result = result.filter((p) => p.mainCategory === query.mainCategory);
    }
    if (query.dressType) {
      result = result.filter((p) => p.dressType.toLowerCase() === query.dressType.toLowerCase());
    }
    if (query.fabricType) {
      result = result.filter((p) => p.fabricType.toLowerCase().includes(query.fabricType.toLowerCase()));
    }
    if (query.isNewCollection === 'true') {
      result = result.filter((p) => p.isNewCollection);
    }
    if (query.isTrending === 'true') {
      result = result.filter((p) => p.isTrending);
    }

    return {
      success: true,
      total: result.length,
      products: result,
    };
  }

  findBySlug(slug: string) {
    const product = this.products.find((p) => p.slug === slug);
    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    const related = this.products
      .filter((p) => p.id !== product.id && p.mainCategory !== product.mainCategory)
      .slice(0, 3);

    return { success: true, product, related };
  }

  create(dto: CreateProductDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = {
      ...dto,
      id: `prod-${Date.now()}`,
      slug,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewsCount: 1,
    };

    this.products.unshift(newProduct);
    return { success: true, product: newProduct };
  }

  remove(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
    return { success: true, message: `Product ${id} removed` };
  }
}
