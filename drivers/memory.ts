import { exec } from "child_process";
import { promisify } from "util";

import { logger } from "@/utils/log";

const execAsync = promisify(exec);

export class MemoryMonitor {
    /**
     * Check memory usage of MySQL processes
     * @returns Promise<string> - Memory usage in MB as a formatted string
     */
    async checkMemoryUsage(): Promise<string> {
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

    /**
     * Get memory usage with additional context
     * @returns Promise<object> - Memory usage with additional metadata
     */
    async getMemoryInfo(): Promise<{
        memoryUsage: string;
        timestamp: Date;
        processCount: number;
    }> {
        const memoryUsage = await this.checkMemoryUsage();
        const timestamp = new Date();
        
        try {
            const { stdout } = await execAsync("ps -eo pid,comm,rss | grep mysqld | wc -l");
            const processCount = parseInt(stdout.trim(), 10) || 0;
            
            return {
                memoryUsage,
                timestamp,
                processCount
            };
        } catch (err) {
            logger.error(`Failed to get process count\n${err}`);
            return {
                memoryUsage,
                timestamp,
                processCount: 0
            };
        }
    }
}

export const memoryMonitor = new MemoryMonitor();

export const checkMemoryUsage = async (): Promise<string> => {
    return memoryMonitor.checkMemoryUsage();
};