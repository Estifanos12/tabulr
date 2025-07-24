import Link from "next/link";
import { Search, Table } from "lucide-react";

import { dbClient } from "@/db/index";
import EachTable from "@/components/table/each-table";
import TableStructure from "@/components/table/table-structure";
import { Button } from "@/components/ui/button"; 
import { CopyToClipboard } from "@/components/ui/copy";

export default async function TablePage({ params }: { params: Promise<{ database: string, table: string }> }) {
    
    const { database, table } = await params;
    
    const [error, data] = await dbClient.getTableData(database, table);
    
    if (error) throw new Error(error);

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                    <Table className="size-5 text-primary" />
                    <span>{table}</span>
                </h3>
                <CopyToClipboard text={table} message="Table name copied to clipboard"   />

                <Link href={`/database/${database}/table/${table}/search`}>
                    <Button>
                        <Search className="size-4" />
                        <span>Search</span>
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col gap-16">
                <EachTable schema={data.schema} rows={data.rows} />
                <TableStructure schema={data.schema} />
            </div>
        </div>
    )
}