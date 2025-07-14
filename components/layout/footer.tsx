import { checkMemoryUsage } from "@/services/memory";
import { dbService } from "@/services/db";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const Footer = async () => {
    const memoryUsage = await checkMemoryUsage();
    const isRunning = await dbService.isRunning();

    const result = await Promise.all([memoryUsage, isRunning]);
    return (
        <footer className=" my-auto h-fit py-5 border-t">
            <div className="flex justify-between items-center container mx-auto">
                <div>
                    <p>Tabulr</p>
                </div>
                <div className="flex items-center gap-5">
                    <p>SQL Server Memory Usage: {result[0]} MB</p>
                    <div className="flex items-center gap-2">
                        <div className={cn("size-3 rounded-full", result[1] ? "bg-green-500" : "bg-red-500")}/>
                        <p>Status: {result[1] ? "Running" : "Not Running"}</p>
                    </div>
                    <Separator orientation="vertical" className="h-full"/>
                </div>
            </div>
        </footer>
    )
}