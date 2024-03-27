import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createThumbnail } from "../mutations/thumbnail";
import {
	countThumbnail,
	getAllThumbnailsWithVotes,
} from "../queries/thumbnail";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const thumbnailRouter = createTRPCRouter({
	countThumbnail: protectedProcedure.query(async ({ ctx }) => {
		const { id } = ctx.session.user;
		return countThumbnail(id);
	}),

	create: protectedProcedure
		.input(
			z.object({
				image: z.any(),
				title: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const user = ctx.session.user;
			if (!user) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "User not found",
				});
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { image, title } = input;

			return createThumbnail(user.id, image as File, title);
		}),

	getAllThumbnailsWithVotes: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user;

		const { id } = user;

		return getAllThumbnailsWithVotes(id);
	}),
});
