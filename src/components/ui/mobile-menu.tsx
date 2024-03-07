"use client";
import { links } from "@/app/constants/constants";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
	return (
		<div className="md:hidden flex">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						className="h-10 w-10 rounded-full border-2 border-gray-100 border-gray-200/50  dark:border-slate-900"
						id="menu"
						size="icon"
						variant="outline"
					>
						<MenuIcon className="h-6 w-6" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className="w-[280px] h-auto dark:bg-gray-900"
				>
					<div className="flex flex-col gap-0.5 p-2">
						{links.map((link, index) => (
							<Link
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="inline-flex w-full flex-1 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
								href={link.href}
							>
								{link.name}
							</Link>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
