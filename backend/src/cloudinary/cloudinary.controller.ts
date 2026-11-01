import { Controller, Post, Body } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('api/cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('optimize')
  optimize(@Body() body: { url: string; transformations?: string }) {
    const optimized = this.cloudinaryService.optimizeUrl(body.url, body.transformations);
    return { success: true, original: body.url, optimized };
  }

  @Post('signature')
  sign(@Body() body: { params: Record<string, any> }) {
    return this.cloudinaryService.generateSignature(body.params || {});
  }
}
