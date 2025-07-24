import { dbClient } from "@/db"
import TableList from "@/components/table/table-list"
export default async function Tables({ params }: { params: Promise<{ database: string }> }) {
    
    const { database } = await params

    const [error, tables] = await dbClient.getTables(database)

    if (error) throw new Error(error)

    return (
        <TableList tables={tables} />
    )
}