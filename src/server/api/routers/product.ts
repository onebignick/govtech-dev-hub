import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { apiCreateProduct, products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(products);
  }),
  create: publicProcedure
    .input(apiCreateProduct)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(products).values(input).returning();
    }),
});
