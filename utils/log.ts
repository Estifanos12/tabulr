const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';

/**
 * Logger
 * @type {Object}
 * @property {Function} info - Log an info message
 * @property {Function} error - Log an error message
 * @property {Function} success - Log a success message
 * @property {Function} debug - Log a debug message
 */

export const logger =  {
    info: (message: string) => {
        console.log(`${yellow}[INFO] ${message}${reset}`);
    },
    error: (message: string) => {
        console.error(`${red}[ERROR] ${message}${reset}`);
    },
    success: (message: string) => {
        console.log(`${green}[SUCCESS] ${message}${reset}`);
    },
    debug: (message: string) => {
        console.debug(`${blue}[DEBUG] ${message}${reset}`);
    }
}