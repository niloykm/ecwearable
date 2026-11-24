import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";

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
        public_id: `ecwearable_url_${Date.now()}`,
      });
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file or URL supplied" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: DEFAULT_PRODUCT_IMAGE,
      secure_url: DEFAULT_PRODUCT_IMAGE,
      public_id: `ecwearable_img_${Date.now()}`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to process image upload";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
