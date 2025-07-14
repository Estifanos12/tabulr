import Link from "next/link"
import { Github } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../../ui/button"
import { Logo } from "../../logo"
import { ModeToggle } from "../../theme/toggle-theme"

import { SYSTEM_DB } from "@/constants"

function renderContent() {

}
export function Sider() {
    return (
        <Sidebar>
            <SidebarHeader className="bg-background flex items-center justify-center m-2 border rounded-lg">
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
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