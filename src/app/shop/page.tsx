import React from "react";
import { ShopClient, ShopInitialParams } from "@/components/shop/ShopClient";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const pickString = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const initialParams: ShopInitialParams = {
    query: pickString(resolved?.query),
    collection: pickString(resolved?.collection),
    gender: pickString(resolved?.gender),
    category: pickString(resolved?.category),
    dressType: pickString(resolved?.dressType),
  };

  return <ShopClient initialParams={initialParams} />;
}
