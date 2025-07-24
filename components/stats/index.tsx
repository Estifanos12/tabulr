import { Database, Table } from "lucide-react";

import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkMemoryUsage } from "@/db/memory";
import { dbClient } from "@/db";

function StatsCard({ title, description , Icon, value }: { title: string, description: string, Icon: React.ElementType, value: string }) { 
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon className="size-5" />
                    <span className="text-lg font-bold">{title}</span>
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-2xl font-bold">{value}</span>
            </CardContent>
        </Card>
    )
}

export default async function DBStats() {
    const [errorVersion, version] = await dbClient.getVersion();
    const [errorCount, countInfo] = await dbClient.getCountInfo();
    const memoryUsage = await checkMemoryUsage();
    
    if (errorVersion) throw new Error(errorVersion);
    if (errorCount) throw new Error(errorCount);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard title="Database" description="Number of databases" Icon={Database} value={countInfo.databases.toString() || "0"} />
            <StatsCard title="Tables" description="Across all databases" Icon={Table} value={countInfo.tables.toString() || "0"} />
            <Card>
                <CardHeader>
                    <CardTitle>Information</CardTitle>
                    <CardDescription>
                        Some additional information about the MySQL server
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-bold">MySQL server memory usage: </span> 
                            <span>{memoryUsage} MB</span>
                        </li>
                        <li>
                            <span className="font-bold">MySQL server version: </span>
                            <span>{version}</span>
                        </li>
                        <li>
                            <span className="font-bold">MySQL server status: </span>
                            <span className="text-green-500">Running</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

