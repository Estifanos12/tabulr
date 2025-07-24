import Link from "next/link"
import { Github } from "lucide-react"

import { dbClient } from "@/db"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroupLabel
} from "@/components/ui/sidebar"
import RenderDB from "@/components/database/db-list"
import { Button } from "../../ui/button"
import { Logo } from "../../logo"
import { ModeToggle } from "../../theme/toggle-theme"

export async function Sider() {
    const [error, databases] = await dbClient.getDatabases()

    if (error) throw new Error(error)

    return (
        <Sidebar>
            <SidebarHeader className="bg-background flex items-center justify-center m-2 border rounded-lg">
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupLabel>Databases</SidebarGroupLabel>
                <RenderDB databases={databases} />
            </SidebarContent>
            <SidebarFooter className="bg-background flex items-center justify-center m-2 border rounded-lg">
            <div className="flex items-center gap-2">
                    <Link href="https://github.com/Estifanos12/tabulr" target="_blank">
                        <Button variant="outline" size="icon">
                            <Github className="size-5" />
                        </Button>
                    </Link>
                    <ModeToggle />
                </div>  
            </SidebarFooter>
        </Sidebar>
    )
}