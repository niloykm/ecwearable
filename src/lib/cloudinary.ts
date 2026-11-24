/**
 * ECWEARABLE Image Optimization & Asset Utility
 */

export const DEFAULT_PRODUCT_IMAGE = "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/cat-heavyweight-tees.webp";

/**
 * Category-aware object-position helper so heads/collars on apparel are never clipped
 * while accessories, bags, footwear, watches, and macro detail shots stay centered.
 */
export function getGarmentObjectPosition(
  mainCategory?: string,
  isMacroDetail: boolean = false
): string {
  if (
    isMacroDetail ||
    mainCategory === "ACCESSORIES" ||
    mainCategory === "WEARABLES" ||
    mainCategory === "FOOTWEAR"
  ) {
    return "object-cover object-center";
  }
  return "object-cover object-top";
}

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "scale" | "fit" | "thumb" | "crop";
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  dpr?: number | string;
}

/**
 * Optimizes Cloudinary URLs with f_auto, q_auto, and responsive width/dpr transforms.
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!url) return DEFAULT_PRODUCT_IMAGE;

  const {
    width,
    quality = "auto",
    format = "auto",
    dpr = "auto",
  } = options;

  if (url.includes("res.cloudinary.com")) {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return url;

    const prefix = url.substring(0, uploadIndex + 8);
    let suffix = url.substring(uploadIndex + 8);

    // Strip any leading transform segment (e.g. f_auto,q_auto/) before rebuilding cleanly
    if (suffix.startsWith("f_") || suffix.startsWith("q_") || suffix.startsWith("w_")) {
      const nextSlash = suffix.indexOf("/");
      if (nextSlash !== -1) {
        suffix = suffix.substring(nextSlash + 1);
      }
    }

    const transforms: string[] = [`f_${format}`, `q_${quality}`];
    if (width) {
      transforms.push(`w_${width}`, "c_limit");
    }
    if (dpr) {
      transforms.push(`dpr_${dpr}`);
    }

    return `${prefix}${transforms.join(",")}/${suffix}`;
  }

  return url;
}

/**
 * Upload an image File, Blob, or external URL directly to Cloudinary via our signed API route.
 */
export async function uploadImageToCloudinary(
  file: File | Blob | string,
  folder: string = "ecwearable/products/custom"
): Promise<{ url: string; public_id: string; secure_url: string }> {
  const formData = new FormData();
  if (typeof file === "string") {
    formData.append("url", file);
  } else {
    formData.append("file", file);
  }
  formData.append("folder", folder);

  const response = await fetch("/api/upload/cloudinary", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error || "Failed to upload image to Cloudinary");
  }

  return {
    url: data.secure_url || data.url,
    secure_url: data.secure_url || data.url,
    public_id: data.public_id,
  };
}
