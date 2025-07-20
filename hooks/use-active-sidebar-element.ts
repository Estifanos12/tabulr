import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"

export const useActiveSidebarElement = () => {
    const searchParams = useSearchParams()
    const params = useParams()

    const CURRENT_DATABASE = params.database as string
    const CURRENT_TABLE = searchParams.get("table") as string

    return { CURRENT_DATABASE, CURRENT_TABLE }
}
