"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/cloudinary";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  fallbackSrc = DEFAULT_PRODUCT_IMAGE,
  alt,
  ...rest
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
