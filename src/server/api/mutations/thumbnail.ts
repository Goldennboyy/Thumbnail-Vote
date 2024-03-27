import { env } from "@/env";
import { db } from "@/server/db";
import { createClient } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

async function uploadImageToSupabase(imageFile: File) {
	const { data, error } = await supabase.storage
		.from("Thumbnail_Image")
		.upload("public/thumbnail", imageFile);

	if (error) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: `Upload image to Supabase failed: ${error.message}`,
		});
	}

	const { path } = data;

	return path;
}

type GetPublicUrlResponse = {
	publicUrl: string;
};

export function getImageUrl(imagePath: string): string {
	const { data } = supabase.storage
		.from("Thumbnail_Image")
		.getPublicUrl(imagePath);

	if (!data) {
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Get image URL from Supabase failed",
		});
	}

	const { publicUrl } = data as GetPublicUrlResponse;

	return publicUrl;
}

export async function createThumbnail(
	userId: string,
	image: File,
	title: string,
) {
	const imageURL = await uploadImageToSupabase(image);

	return db.thumbnail.create({
		data: {
			userId: userId,
			title: title,
			image: getImageUrl(imageURL),
			vote: {
				create: {
					voteCount: 0,
					userId: userId,
				},
			},
		},
		select: {
			userId: true,
			title: true,
			image: true,
		},
	});
}
