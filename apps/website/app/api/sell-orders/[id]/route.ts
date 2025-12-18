import { NextResponse } from "next/server";
import { db, sellOrders, eq } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

// GET is staff-only (exposes seller PII)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [order] = await db
      .select()
      .from(sellOrders)
      .where(eq(sellOrders.id, id));

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to fetch sell order:", error);
    return NextResponse.json(
      { error: "Failed to fetch sell order" },
      { status: 500 }
    );
  }
}

// PATCH is staff-only (updates order status/prices)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const data = await req.json();

    // Only allow updating specific fields
    const allowedFields = [
      "status",
      "inspectionDate",
      "inspectionTime",
      "inspectionAddress",
      "estimatedPriceMin",
      "estimatedPriceMax",
      "finalPrice",
    ];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        // Handle date fields
        if (field === "inspectionDate" && data[field]) {
          updateData[field] = new Date(data[field]);
        } else {
          updateData[field] = data[field];
        }
      }
    }

    updateData.updatedAt = new Date();

    const [order] = await db
      .update(sellOrders)
      .set(updateData)
      .where(eq(sellOrders.id, id))
      .returning();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to update sell order:", error);
    return NextResponse.json(
      { error: "Failed to update sell order" },
      { status: 500 }
    );
  }
}

// DELETE is staff-only
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [deleted] = await db
      .delete(sellOrders)
      .where(eq(sellOrders.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete sell order:", error);
    return NextResponse.json(
      { error: "Failed to delete sell order" },
      { status: 500 }
    );
  }
}
