"use client";
import { links } from "@/app/constants/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Thumbnail from "../../../public/assets/image.webp";
import MobileMenu from "./mobile-menu";
import SignInButton from "./signInButton";
import { ThemeToggle } from "./theme-toggle";

type navbarProps = {
	session: Session | null;
};
const Navbar = ({ session }: navbarProps) => {
	return (
		<nav className="mx-auto flex justify-center border-b border-b-gray-100/10 bg-white p-4 dark:bg-gray-900">
			<div className="mt-2 flex w-full max-w-7xl justify-between space-x-4">
				<div className="flex gap-2 items-center flex-shrink-0">
					<Link href={"/"}>
						<Image
							src={Thumbnail}
							height={50}
							width={50}
							className="object-contain"
							alt="Thumbnail"
						/>
					</Link>
					<p className=" text-xs md:text-base">ThumbRank</p>
				</div>

				{session && (
					<ul className="hidden md:flex space-x-8">
						{links.map((link) => (
							<li key={link.name}>
								<a className="text-lg " href={link.href}>
									{link.name}
								</a>
							</li>
						))}
					</ul>
				)}

				<div className="flex gap-4">
					{session && (
						<Avatar>
							<AvatarImage src={session.user.image ?? " "} />
						</Avatar>
					)}
					<SignInButton session={session} />
					<ThemeToggle />
					<MobileMenu />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
