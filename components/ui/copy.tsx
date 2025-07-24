'use client'

import { Copy } from "lucide-react";

import { Button } from "./button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

function CopyToClipboard({ text, message }: { text: string, message?: string }) {
    
    const [_, copy] = useCopyToClipboard({ message });

    return (
        <Button variant="outline" size="sm"  onClick={() => copy(text)}>
            <Copy />
        </Button>
    )
}

export { CopyToClipboard }