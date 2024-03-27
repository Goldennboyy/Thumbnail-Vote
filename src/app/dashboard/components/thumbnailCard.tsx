import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Thumbnail, Vote } from "@prisma/client";
import Image from "next/image";
import React from "react";

export const ThumbnailCards = () => {
	const { data, isLoading } =
		api.thumbnail.getAllThumbnailsWithVotes.useQuery();

	console.log({ data });

	// add a component for handling loading such as a spinner
	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data?.map((thumbnail) => (
				<ThumbnailCard key={thumbnail.id} thumbnail={thumbnail} />
			))}
		</div>
	);
};

interface Props {
	thumbnail: Thumbnail & { vote: Vote[] };
}

const ThumbnailCard = ({ thumbnail }: Props) => {
	return (
		<Card className={cn()}>
			<CardContent>
				<div>
					<figure>
						<Image
							src={thumbnail.image}
							alt="thumbnail"
							width={300}
							height={250}
							className="object-cover"
						/>
					</figure>
				</div>
				<div className="flex flex-col gap-2">
					<p>{thumbnail.title}</p>

					{thumbnail.vote.map((vote) => (
						<p key={vote.id}> Vote : {vote.voteCount} </p>
					))}
					<p> Created on : {thumbnail.createdAt.toLocaleDateString()}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default ThumbnailCards;
