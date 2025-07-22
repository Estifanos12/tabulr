import { NextRequest, NextResponse } from "next/server";
import { dbClient } from "@/drivers";

export async function POST(request: NextRequest) {
    const { query, database } = await request.json();

    const [error, result] = await dbClient.runQuery(query, database);

    if (error) return NextResponse.json({ error: error }, { status: 500 });

    return NextResponse.json(result);
}   