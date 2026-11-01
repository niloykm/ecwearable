import { NextRequest, NextResponse } from "next/server";
import { SEED_PRODUCTS } from "@/data/seedProducts";
import { Product } from "@/types/commerce";

// In-memory runtime store for server handlers (synced with client Zustand seed)
let serverProducts: Product[] = [...SEED_PRODUCTS];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");
  const ageGroup = searchParams.get("ageGroup");
  const mainCategory = searchParams.get("mainCategory");
  const dressType = searchParams.get("dressType");
  const fabricType = searchParams.get("fabricType");
  const isNewCollection = searchParams.get("isNewCollection");
  const isTrending = searchParams.get("isTrending");
  const search = searchParams.get("search");

  let filtered = [...serverProducts];

  if (gender) {
    filtered = filtered.filter((p) => p.gender === gender);
  }
  if (ageGroup) {
    filtered = filtered.filter((p) => p.ageGroup === ageGroup);
  }
  if (mainCategory) {
    filtered = filtered.filter((p) => p.mainCategory === mainCategory);
  }
  if (dressType) {
    filtered = filtered.filter((p) => p.dressType.toLowerCase() === dressType.toLowerCase());
  }
  if (fabricType) {
    filtered = filtered.filter((p) => p.fabricType.toLowerCase().includes(fabricType.toLowerCase()));
  }
  if (isNewCollection === "true") {
    filtered = filtered.filter((p) => p.isNewCollection);
  }
  if (isTrending === "true") {
    filtered = filtered.filter((p) => p.isTrending);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.dressType.toLowerCase().includes(q) ||
        p.fabricType.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: Product = await request.json();
    if (!body.name || !body.dressType || !body.fabricType) {
      return NextResponse.json(
        { success: false, error: "Missing required product fields" },
        { status: 400 }
      );
    }

    serverProducts = [body, ...serverProducts];

    return NextResponse.json({
      success: true,
      product: body,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
