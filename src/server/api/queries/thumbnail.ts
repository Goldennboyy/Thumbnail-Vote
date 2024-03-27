import { db } from "@/server/db";

async function countThumbnail(userId: string): Promise<number> {
	return db.thumbnail.count({
		where: {
			userId: userId,
		},
	});
}

async function getAllThumbnailsWithVotes(userId: string) {
	return db.thumbnail.findMany({
		include: {
			vote: true,
		},
		where: {
			userId: userId,
		},
	});
}

export { countThumbnail, getAllThumbnailsWithVotes };
