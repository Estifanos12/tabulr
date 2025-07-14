import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Table, Users } from "lucide-react";

function StatsCard({ title, description , Icon, value }: { title: string, description: string, Icon: React.ElementType, value: string }) { 
    return (
        <Card>
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

export default function DBStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard title="Database" description="Number of databases" Icon={Database} value="10" />
            <StatsCard title="Tables" description="Across all databases" Icon={Table} value="127" />
            <StatsCard title="Active Connections" description="Number of active connections" Icon={Users} value="10" />
        </div>
    )
}

