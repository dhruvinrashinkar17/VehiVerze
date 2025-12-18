import { NextResponse } from "next/server";
import { db, leads, eq } from "@vehiverze/database";
import { requireStaff, isAuthError } from "@/lib/domain-user";

/**
 * GET /api/leads/[id]
 * Get a single lead by ID (staff-only)
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Failed to fetch lead:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/leads/[id]
 * Update a lead's status or other fields (staff-only)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const data = await request.json();

    // Only allow updating specific fields
    const allowedFields = ["status", "message"];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    const [updated] = await db
      .update(leads)
      .set(updateData)
      .where(eq(leads.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/leads/[id]
 * Delete a lead (staff-only)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const [deleted] = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
