import { dbService } from "@/services/db"

export default async function Database({ 
    params,
    searchParams
}: { 
    params: Promise<{ database: string }> 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const param =  await params
    const filters = await searchParams

    // const [error, data] = await dbService.checkDatabaseStatus(param.database)

    // if (error) throw new Error(error)

    // console.log(data)
    
    return (
        <div>
            <h1>Database: {param.database}</h1>
            <h1>Table: {filters.table}</h1>
            <h1>Tab: {filters.tab}</h1>
        </div>
    )
}