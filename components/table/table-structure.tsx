import { Network } from "lucide-react";

import { type TableSchema } from "@/db";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../ui/table";

interface TableStructureProps {
    schema: TableSchema[];
}

export default function TableStructure({ schema }: TableStructureProps) {

    if (schema.length === 0) return null;
    const columns = Object.keys(schema[0]) as (keyof TableSchema)[];

    return (
        <div className="max-w-7xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Network className="size-5 text-primary" />
                <span>Table Structure</span>
            </h3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column}>{column}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        schema.map((row) => (
                            <TableRow key={row.Field}>
                                {columns.map((column) => {
                                    let value: string | React.ReactNode = row[column];
                                    if(column === "Key" && value === "PRI") value = "PRIMARY KEY"
                                    if (value === '') value = <i>No data</i>
                                    return (
                                        <TableCell key={column}>{value}</TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </div>
        </div>
    )
}