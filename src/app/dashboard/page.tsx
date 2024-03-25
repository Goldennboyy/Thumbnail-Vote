"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import noThumbnail from "../../../public/assets/void.svg";

const DashboardPage = () => {
	const { data: count } = api.thumbnail.countThumbnail.useQuery();

	console.log("Count is : ", { count });
	return (
		<div className="max-w-7xl w-full mx-auto">
			<div className="flex flex-col justify-center items-center pt-20 space-y-16">
				<h1 className="text-3xl text-center font-bold">Your Thumbnail Tests</h1>
				<figure className="bg-white p-8 rounded-lg">
					<Image
						src={noThumbnail as string}
						height={250}
						width={200}
						alt="Thumbnail"
						className="object-cover"
					/>
				</figure>
				<p className="text-lg font-semibold tracking-tight leading-none">
					You have not created any thumbnail yet.
				</p>
				<Link href={"/create"}>
					<Button variant="default">Create a Thumbnail</Button>
				</Link>
			</div>
		</div>
	);
};

export default DashboardPage;
