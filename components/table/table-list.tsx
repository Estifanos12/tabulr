'use client'

import { type TableResult } from "@/db";
import { Table, TableBody, TableHead, TableRow, TableCaption, TableHeader, TableCell, TableFooter } from "../ui/table";
import { Button } from "../ui/button";

import { useList } from "@/hooks/use-list";
import Link from "next/link";

export default function TableList({ tables }: { tables: TableResult[] }) {
    
    const { displayedItems, hasMore, handleLoadMore, filteredCount } = useList({
        data: tables,
        initialDisplayCount: 15
    })
    
    return (
        <Table className="max-w-3xl">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-left">TABLE_NAME</TableHead>
                    <TableHead>TABLE_SCHEMA</TableHead>
                    <TableHead>TABLE_TYPE</TableHead>
                    <TableHead className="text-right">TABLE_COLLATION</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    displayedItems.length > 0 ? (
                        displayedItems.map((table) => (
                            <TableRow key={table.table_name}>
                                <TableCell className="font-medium">
                                    <Link href={`/database/${table.table_schema}/table/${table.table_name}`} className="hover:underline">
                                        {table.table_name}
                                    </Link>
                                </TableCell>
                                <TableCell>{table.table_schema}</TableCell>
                                <TableCell>{table.table_type}</TableCell>
                                <TableCell className="text-right ">{table.table_collation || "NULL"}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center my-5">No tables found</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
            {
                hasMore && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                <Button className="my-5" onClick={handleLoadMore}>Load more ({filteredCount - displayedItems.length} remaining)</Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )
            }
        </Table>
    )
}