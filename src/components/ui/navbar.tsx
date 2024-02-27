import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { type Session } from "next-auth";
import Image from "next/image";
import React from "react";
import Thumbnail from "../../../public/assets/image.webp";
import SignInButton from "./signInButton";
import { ThemeToggle } from "./theme-toggle";


type navbarProps = {
    session: Session | null
}
const Navbar = ({ session }: navbarProps) => {

    type linkProps = {
        name: string,
        href: string
    }

    const links: linkProps[] = [
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Create",
            href: "/create"
        },
        {
            name: "Explore",
            href: "/explore"
        },
        {
            name: "Following",
            href: "/following"
        }
    ]


    return (
        <nav className="flex justify-center p-4 mx-auto bg-white border-b dark:bg-gray-900 border-b-gray-100/10">

            <div className="flex justify-between w-full mt-2 max-w-7xl">

                <div className="flex gap-4">
                    <Image
                        src={Thumbnail}
                        height={50}
                        width={50}
                        className="object-contain"
                        alt="Thumbnail"
                    />
                    <p className="text-lg ">ThumbRank</p>
                </div>

                {session && (
                    <ul className="flex space-x-8">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    className="text-lg "
                                    href={link.href}
                                >
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
                </div>

            </div>

        </nav>
    );
};

export default Navbar;
