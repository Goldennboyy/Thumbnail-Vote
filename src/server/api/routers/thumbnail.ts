import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createThumbnail } from "../mutations/thumbnail";
import { countThumbnail } from "../queries/thumbnail";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const thumbnailRouter = createTRPCRouter({
	countThumbnail: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user;
		return countThumbnail(user.id);
	}),

	create: protectedProcedure
		.input(
			z.object({
				image: z.string(),
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

			const { image, title } = input;

			return createThumbnail(user.id, image, title);
		}),
});
