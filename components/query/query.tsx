'use client'

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import QueryEditor from "./query-editor";
// import QueryResult from "./query-result";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { logger } from "@/utils/log";
import useLocalStorage from "@/hooks/use-localstorage";

export default function Query() {

    const [savedQuery, saveQuery] = useLocalStorage("query", "SELECT * FROM users");
    const [query, setQuery] = useState(savedQuery);
    const params = useParams();
    const database = params.database as string;
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    const [result, setResult] = useState<any>(null);
    const [hasError, setHasError] = useState(false);

    const runQuery = async () => {
            saveQuery(query);
            const startTime = performance.now();
            const response = await fetch('/api/query', {
                method: 'POST',
                body: JSON.stringify({ query, database }),
            });
            const data = await response.json();
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            setExecutionTime(executionTime);

            if (response.ok) {
                setHasError(false);
                logger.info('Query executed successfully');
                setResult(data.data);
                toast("Query executed successfully", {
                    description: "Query executed successfully",
                    position: "bottom-right",
                });
            } else {
                setHasError(true);
                logger.error('Error running query:' + data.error);
                toast.error('Error running query', {
                    description: data.error || "Unknown error",
                    position: "bottom-right",
                });
            }
    }

    return (
        <div className="h-[96%] flex flex-col gap-2">
            <ResizablePanelGroup className="h-full" direction="vertical">
                <ResizablePanel minSize={20}>
                    <QueryEditor query={query} setQuery={setQuery} runQuery={runQuery} executionTime={executionTime} />
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel minSize={20}>
                <div className="h-full flex justify-center items-center">hel</div>
                    {/* <QueryResult result={result} hasError={hasError} /> */}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}