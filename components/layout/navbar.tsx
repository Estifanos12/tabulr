import Link from "next/link"
import { Github } from "lucide-react"

import { Logo } from "../logo"
import { ModeToggle } from "../theme/toggle-theme"

export const Navbar = () => {
    return (
        <header className="border-b mb-5">
            <nav className="container mx-auto flex items-center justify-between py-5">
                <Logo />
                <div className="flex items-center gap-2">
                    <Link href="https://github.com/Estifanos12/tabulr" target="_blank">
                        <Github className="size-5" />
                    </Link>
                    <ModeToggle />
                </div>
            </nav>
        </header>
    )
}