import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { apiCreateProduct, products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(apiCreateProduct)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(products).values({
        name: input.name,
      });
    }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.products.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),
});
