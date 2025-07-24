"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Database, Table, CircleQuestionMark } from "lucide-react"

import { useList } from "@/hooks/use-list"
import { useActiveSidebarElement } from "@/hooks/use-active-sidebar-element"
import { useFetch } from "@/hooks/use-fetch"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, useSidebar, SidebarMenuSubButton } from "../ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader } from "../loader"

import { DB_REFERENCE_URL } from "@/constants"
import { type TableResult } from "@/db"

function RenderTable({ dbName }: { dbName: string }) {
    const { data, error, loading } = useFetch<{ tables: TableResult[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tables?dbName=${dbName}`)

    const tables = data?.tables.map(table => table.table_name)
    const params = useParams()


    const { displayedItems, hasMore, searchTerm, handleLoadMore, handleSearchChange, filteredCount } = useList({
        data: tables || [],
    })

    if (tables?.length === 0) return <div className="flex justify-center my-4"><p className="text-sm">No tables found</p></div>

    if (loading) return <Loader size="sm" message="Loading tables..." />

    if (error.status) return <div className="flex justify-center my-4"><p className="text-sm">Error fetching tables</p></div>


    return (
        <React.Fragment>
            <div className="my-2">
                <Input
                    type="search"
                    placeholder="Search for tables"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=""
                />
            </div>
            {displayedItems.map(table => (
                <SidebarMenuSubItem key={table}>
                    <SidebarMenuSubButton isActive={params?.table === table}>
                        <Link href={`/database/${dbName}/table/${table}`} className="hover:underline">
                            <div className="flex items-center gap-2">
                                <Table className="size-4" />
                            <span>{table}</span>
                            </div>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}

            <div className="flex justify-center my-4">
                {hasMore && (
                    <Button onClick={handleLoadMore} className="w-fit">
                        Load More ({filteredCount - displayedItems.length} remaining)
                    </Button>
                )}
            </div>
        </React.Fragment>
    )
}

export default function RenderDB({ databases }: { databases: string[] }) {

    const { CURRENT_DATABASE } = useActiveSidebarElement()
    const [activeDatabase, setActiveDatabase] = useState<string | null>(CURRENT_DATABASE)
    const { displayedItems, hasMore, searchTerm, handleLoadMore, handleSearchChange, filteredCount } = useList({
        data: databases,
    })

    return (
        <React.Fragment>
            <div className="px-2">
                <Input
                    type="search"
                    placeholder="Search for databases"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className=""
                />
            </div>

            {displayedItems.length === 0 && (
                <div className="flex justify-center my-4">
                    <p className="text-sm">No databases found</p>
                </div>
            )}

            {displayedItems.map(db => {
                return (
                    <SidebarGroup key={db}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <Collapsible className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton isActive={activeDatabase === db} onClick={() => setActiveDatabase(db)}>
                                                <Link href={`/database/${db}/tables`} className="flex items-center gap-2 hover:underline">
                                                    <Database className="size-4" />
                                                    <span>{db}</span>
                                                </Link>
                                                {
                                                    DB_REFERENCE_URL[db as keyof typeof DB_REFERENCE_URL] && (
                                                        <Link href={DB_REFERENCE_URL[db as keyof typeof DB_REFERENCE_URL]}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                            }}
                                                        target="_blank" className="ml-auto">
                                                            <CircleQuestionMark className="size-3" />
                                                        </Link>
                                                    )
                                                }
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <RenderTable dbName={db} />
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )
            })}
            <div className="flex justify-center my-4">
                {hasMore && (
                    <Button onClick={handleLoadMore} className="w-fit">
                        Load More ({filteredCount - displayedItems.length} remaining)
                    </Button>
                )}
            </div>
        </React.Fragment>
    )

}