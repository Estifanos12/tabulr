import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface LoaderProps {
    message: string
    className?: string
    size: "sm" | "md" | "lg"
}

export const Loader = ({ message, className, size = "md" }: LoaderProps) => {
    return (
        <div className={cn("flex-1 flex flex-col items-center justify-center h-full gap-4 my-5", className)}>
            <Loader2 className={cn("size-18 animate-spin", {
                "size-10": size === "sm",
                "size-18": size === "md",
                "size-24": size === "lg"
            })} />
            <p className={cn("text-lg font-semibold", {
                "text-sm": size === "sm",
                "text-md": size === "md",
                "text-lg": size === "lg"
            })}>{message}</p>
        </div>
    )
}