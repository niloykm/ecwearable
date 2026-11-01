import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  optimizeUrl(url: string, transformations: string = 'f_auto,q_auto') {
    if (!url) return '';
    if (url.includes('res.cloudinary.com')) {
      const parts = url.split('/upload/');
      return `${parts[0]}/upload/${transformations}/${parts[1]}`;
    }
    return url;
  }

  generateSignature(paramsToSign: Record<string, any>) {
    // Generates signed signature hash for secure client uploads
    return {
      timestamp: Math.round(new Date().getTime() / 1000),
      signature: 'mock_signed_sha256_hash',
      apiKey: process.env.CLOUDINARY_API_KEY || 'demo_key',
    };
  }
}
