import { format, type FormatOptionsWithLanguage } from 'sql-formatter';

export function formatQuery(sql: string, options?: FormatOptionsWithLanguage) {
    return format(sql, {
        language: 'mysql',
        ...options,
    });
}