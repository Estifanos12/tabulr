"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeXml, Database, Info, SquareDashedMousePointer, TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TabsLinkTrigger: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({
	href,
	children,
	className,
}) => (
	<TabsTrigger value={href} className={cn(className, "rounded-none bg-background h-full data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t")} asChild>
		<Link href={href}>{children}</Link>
	</TabsTrigger>
);

export default function DatabaseTabs({ database }: { database: string }) {
	const path = usePathname();

	return (
		<Tabs defaultValue={path} className="w-full">
			<TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
				<TabsLinkTrigger href={`/database/${database}/tables/`}>
                    <div className="flex items-center gap-2 ">
                        <TableIcon className="size-4" />
                        Tables
                    </div>
                </TabsLinkTrigger>
				<TabsLinkTrigger href={`/database/${database}/query`}>
					<div className="flex items-center gap-2">
						<CodeXml className="size-4" />
						Query
					</div>
				</TabsLinkTrigger>
				<TabsLinkTrigger href={`/database/${database}/schema`}>
					<div className="flex items-center gap-2">
						<SquareDashedMousePointer className="size-4" />
						Schema
					</div>
				</TabsLinkTrigger>
				<TabsLinkTrigger href={`/database/${database}/indexes`}>
					<div className="flex items-center gap-2">
						<Database className="size-4" />
						Indexes
					</div>
				</TabsLinkTrigger>


				<TabsLinkTrigger href={`/database/${database}/metadata`}>
					<div className="flex items-center gap-2">
						<Info className="size-4" />
						Metadata
					</div>
				</TabsLinkTrigger>
			</TabsList>
		</Tabs>
	);
};