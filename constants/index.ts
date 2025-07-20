export enum HttpStatus {
    // 200
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,

    // 300
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    // 400
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONTENT_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    IM_A_TEAPOT = 418,
    TOO_MANY_REQUESTS = 429,

    // 500
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    INSUFFICIENT_STORAGE = 507,
}

export const SYSTEM_DB = [
    'information_schema',
    'performance_schema',
    'sys',
    'test' // MariaDB
]

/**
 * System Databases reference URLs
 * @type {Record<string, string>}
 * @property {string} information_schema - URL for MySQL 8.4 information schema reference
 * @property {string} performance_schema - URL for MySQL 8.4 performance schema reference
 * @property {string} sys - URL for MySQL 8.4 sys schema reference
 */

export const DB_REFERENCE_URL = {
    "information_schema": "https://dev.mysql.com/doc/refman/8.4/en/information-schema.html",
    "performance_schema": "https://dev.mysql.com/doc/refman/8.4/en/performance-schema.html",
    "sys": "https://dev.mysql.com/doc/refman/8.4/en/sys-schema.html",
}