import { type SearchValue } from "@/types"

export function buildSearchQuery(database: string, table: string, searchValue: SearchValue[]): string {

    let changed = false

    searchValue.forEach(item => {
        if (item.value !== "") {
            changed = true
        }
    })

    if (!changed) {
        return ""
    }
    
    const query = searchValue
        .filter(item => item.value !== "")
        .map(item => `${item.field} ${item.operator} ${item.value}`)
        .join(" AND ")
        .trim()
        
    return `SELECT * FROM ${database}.${table} WHERE ` + query
}