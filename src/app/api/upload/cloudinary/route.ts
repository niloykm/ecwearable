import { NextRequest, NextResponse } from "next/server";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const externalUrl = formData.get("url") as string | null;

    if (externalUrl) {
      const optimized = optimizeCloudinaryUrl(externalUrl, { quality: "auto:best" });
      return NextResponse.json({
        success: true,
        url: optimized,
        secure_url: optimized,
        public_id: `aurelia_url_${Date.now()}`,
      });
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file or URL supplied" },
        { status: 400 }
      );
    }

    // High quality mock optimization for uploaded images
    const mockOptimizedUrl =
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80";

    return NextResponse.json({
      success: true,
      url: mockOptimizedUrl,
      secure_url: mockOptimizedUrl,
      public_id: `aurelia_img_${Date.now()}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image upload" },
      { status: 500 }
    );
  }
}
