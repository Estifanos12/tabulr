import { NextResponse } from "next/server"
import { dbClient } from "@/db"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const dbName = searchParams.get("dbName")
    if (!dbName) return NextResponse.json({ error: "Database name is required" }, { status: 400 }) 

    const [error, tables] = await dbClient.getTables(dbName)

    if (error) return NextResponse.json({ error: error }, { status: 500 })

    return NextResponse.json({ tables })
}