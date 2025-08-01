'use client'

import React, { useRef, useState } from "react"
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

import { type TableSchema } from "@/db"
import { operators } from "@/db/operators"
import { type SearchValue } from "@/types"
import { buildSearchQuery } from "@/utils/search-query-builder"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Input } from "../ui/input"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select"
import { Button } from "../ui/button"
import { formatQuery } from "@/utils/sql-formatter"

interface TableSearchProps {
    schema: TableSchema[]
    database: string
    table: string
}

export default function TableSearch({ schema, database, table }: TableSearchProps) {
    const [query, setQuery] = useState("")

    const searchValueRef = useRef<SearchValue[]>(schema.map(column => ({
        field: column.Field,
        operator: operators[0].symbol,
        value: ""
    })))

    const handleSearch = () => {
        console.log(searchValueRef.current)
    }


    return (
        <div className="max-w-7xl flex lg:flex-row flex-col gap-4">
            <div className="flex-1 border rounded-md p-4 flex flex-col gap-4">
                <Table className="max-w-7xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Field</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schema.map((column, index) => (
                            <React.Fragment key={column.Field}>
                                <TableRow>
                                    <TableCell>{column.Field}</TableCell>
                                    <TableCell>{column.Type}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={operators[0].symbol}
                                            onValueChange={(value) => {
                                                searchValueRef.current[index].operator = value
                                            }}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Operator" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {operators.map((operator) => (
                                                    <SelectItem key={operator.name} value={operator.symbol}>{operator.symbol}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input className="w-[180px]" type="text" placeholder="Enter value" onChange={(e) => {
                                            searchValueRef.current[index].value = e.target.value
                                        }}/>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-end gap-2">
                    <Button onClick={handleSearch}>Search</Button>

                    <Button onClick={() => {
                        setQuery(formatQuery(buildSearchQuery(database, table, searchValueRef.current)))
                    }}>Show Query</Button>
                </div>
            </div>

            <div className="flex-1 border rounded-md p-4 flex flex-col gap-4">
                <h3 className="text-lg font-bold">Show Query</h3>
                <div>
                    <CodeMirror
                        extensions={[sql()]}
                        value={query || "''"}
                        onChange={(value) => setQuery(value)}
                    />
                </div>
            </div>
        </div>
    )
}