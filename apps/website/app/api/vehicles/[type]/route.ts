import { NextResponse } from "next/server";
import { db, vehicles, inspections, eq } from "@vehiverze/database";

export async function GET(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    // Get vehicles with their inspections
    const vehiclesList = await db
      .select({
        vehicle: vehicles,
        inspection: inspections,
      })
      .from(vehicles)
      .leftJoin(inspections, eq(vehicles.id, inspections.vehicleId))
      .where(eq(vehicles.type, params.type));

    // Transform to match expected format
    const result = vehiclesList.map(({ vehicle, inspection }) => ({
      ...vehicle,
      inspection,
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
