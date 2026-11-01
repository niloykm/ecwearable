import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/types/commerce";

let serverOrders: Order[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    orders: serverOrders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AUR-2603-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: orderData.orderStatus || "CONFIRMED",
          timestamp: new Date().toISOString(),
          note: "Order registered in server fulfillment ledger.",
        },
      ],
    };

    serverOrders = [newOrder, ...serverOrders];

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process order" },
      { status: 500 }
    );
  }
}
