import TableSearch from "@/components/table/search";
import { dbClient } from "@/db/index";

export default async function Search({ params }: { params: Promise<{ database: string, table: string, search: string }> }) {

    const { database, table } = await params;
    
    const [error, {  schema }] = await dbClient.getTableData(database, table);
    
    if (error) throw new Error(error);

    return (
        <div>
            <h1 className="text-lg font-bold mb-4">Search 
                <span className="text-primary"> {table}</span>
            </h1>
            <TableSearch schema={schema} database={database} table={table} />
        </div>
    )
}