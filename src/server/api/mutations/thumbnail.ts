import { db } from "@/server/db";

export function createThumbnail(userId: string, image: string, title: string) {
	return db.thumbnail.create({
		data: {
			userId: userId,
			title: title,
			image: image,
		},
	});
}
