import Link  from "next/link"

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-1">
            <svg width={25} height={25} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M14 0H2V4H14V0Z" fill="currentColor"></path> <path d="M2 6H7V10H2V6Z" fill="currentColor"></path> <path d="M2 12H7V16H2V12Z" fill="currentColor"></path> <path d="M9 12H14V16H9V12Z" fill="currentColor"></path> <path d="M14 6H9V10H14V6Z" fill="currentColor"></path> </g></svg>

            <h1 className="text-2xl font-bold text-foreground">Tabulr.</h1>
        </Link>
    )
}