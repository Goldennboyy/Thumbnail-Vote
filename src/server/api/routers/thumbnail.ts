import { countThumbnail } from "../queries/thumbnail";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const thumbnailRouter = createTRPCRouter({
	countThumbnail: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user;
		return countThumbnail(user.id);
	}),
});
