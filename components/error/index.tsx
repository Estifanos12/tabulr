'use client'

import { Button } from "@/components/ui/button"
import { Info, LucideIcon, CircleX } from "lucide-react"

import { ErrorIcon } from "@/icons/error"

interface ErrorProps {
    message: string;
    Icon?: LucideIcon;
    label?: string;
    description?: string;    
    action?: () => void;
}

export const Error = ({ message, Icon, label, description, action }: ErrorProps) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full gap-4">
            {Icon ? <Icon className="size-18" /> : <ErrorIcon />}
            <p className="text-xl font-semibold">{message}</p>
            {description && 
            <div className="flex items-center gap-2">
                <Info className="size-4" />
                <p className="text-lg text-muted-foreground">{description}</p>
            </div>}
            {action && <Button className="my-5" size="lg" onClick={action}>{label}</Button>}
        </div>
    )
}