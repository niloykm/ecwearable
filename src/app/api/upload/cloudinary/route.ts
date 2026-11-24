import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function signCloudinaryParams(
  params: Record<string, string>,
  apiSecret: string
): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(`${toSign}${apiSecret}`)
    .digest("hex");
}

function injectAutoTransforms(secureUrl: string): string {
  if (!secureUrl.includes("/image/upload/")) return secureUrl;
  if (secureUrl.includes("/image/upload/f_auto")) return secureUrl;
  return secureUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

export async function POST(request: NextRequest) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary server credentials (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const externalUrl = formData.get("url") as string | null;
    const folder =
      (formData.get("folder") as string | null)?.trim() ||
      "ecwearable/products/custom";

    if (!file && !externalUrl) {
      return NextResponse.json(
        { success: false, error: "No image file or URL supplied" },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const publicId = `${folder.replace(/^\/+|\/+$/g, "")}/sku-${Date.now()}`;

    const signParams: Record<string, string> = {
      invalidate: "true",
      overwrite: "true",
      public_id: publicId,
      timestamp,
    };

    const signature = signCloudinaryParams(signParams, apiSecret);

    const uploadBody = new FormData();
    if (file && typeof file !== "string") {
      uploadBody.append("file", file);
    } else if (externalUrl) {
      uploadBody.append("file", externalUrl);
    }
    uploadBody.append("api_key", apiKey);
    uploadBody.append("timestamp", timestamp);
    uploadBody.append("public_id", publicId);
    uploadBody.append("overwrite", "true");
    uploadBody.append("invalidate", "true");
    uploadBody.append("signature", signature);

    const cloudinaryResp = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadBody,
      }
    );

    const data = await cloudinaryResp.json();

    if (!cloudinaryResp.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error?.message || "Cloudinary upload failed with an error",
        },
        { status: cloudinaryResp.status }
      );
    }

    const optimizedSecureUrl = injectAutoTransforms(data.secure_url);

    return NextResponse.json({
      success: true,
      url: optimizedSecureUrl,
      secure_url: optimizedSecureUrl,
      public_id: data.public_id,
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to upload to Cloudinary";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
