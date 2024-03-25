import { db } from "@/server/db";

export function countThumbnail(userId: string): Promise<number> {
	return db.thumbnail.count({
		where: {
			userId: userId,
		},
	});
}
