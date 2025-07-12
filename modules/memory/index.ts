import { exec } from "child_process";
import { promisify } from "util";

import { logger } from "../../utils/log";

const execAsync = promisify(exec);

export const checkMemoryUsage = async (): Promise<string> => {
    try {
        const { stdout } = await execAsync("ps -eo pid,comm,rss | grep mysqld");
        
        const lines = stdout.trim().split('\n');
        const totalKb = lines.reduce((sum, line) => {
            const parts = line.trim().split(/\s+/);
            const rssKb = parseInt(parts[2], 10);
            return sum + (isNaN(rssKb) ? 0 : rssKb);
        }, 0);

        const totalMb = (totalKb / 1024).toFixed(2);
        return totalMb;
    } catch (err) {
        logger.error(`Failed to fetch MySQL process\n${err}`);
        return "0.00";
    }
}