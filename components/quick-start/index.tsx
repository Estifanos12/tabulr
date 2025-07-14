import { FileText } from "lucide-react";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "../ui/card";

export default function QuickStart() {
    return (
        <Card className="backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="size-6" />
                    <h2 className="text-lg md:text-xl font-bold">Quick Start Guide</h2>
                </CardTitle>
                <CardDescription>
                    Get started with exploring your data.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border ">
                        <h3 className="font-semibold mb-2">1. Select a Database</h3>
                        <p className="text-sm ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">2. Query Data</h3>
                        <p className="text-sm ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">3. Explore Structure/Schema</h3>
                        <p className="text-sm ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                        <h3 className="font-semibold mb-2">4. Manage Data</h3>
                        <p className="text-sm ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}