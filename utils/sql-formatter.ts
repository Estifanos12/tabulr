import { format, type FormatOptionsWithLanguage } from 'sql-formatter';

/**
 * Format a SQL query
 * @param {string} sql - The SQL query to format
 * @param {FormatOptionsWithLanguage} options - The options for the formatter
 * @returns {string} - The formatted SQL query
 */
export function formatQuery(sql: string, options?: FormatOptionsWithLanguage) {
    return format(sql, {
        language: 'mysql',
        ...options,
    });
}