"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import noThumbnail from "../../../public/assets/void.svg";
import ThumbnailCards from "./components/thumbnailCard";

const DashboardPage = () => {
	const { data: countThumbnail } = api.thumbnail.countThumbnail.useQuery();

	if (!countThumbnail) return;

	console.log("Count is : ", { countThumbnail });

	return (
		<div className="max-w-7xl w-full mx-auto">
			<div className="flex flex-col  justify-center items-center pt-20 space-y-16">
				<h1 className="text-3xl text-center font-bold">Your Thumbnail Tests</h1>
				<div className="flex w-full p-4">
					{countThumbnail >= 1 ? (
						<ThumbnailCards />
					) : (
						<div>
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
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
