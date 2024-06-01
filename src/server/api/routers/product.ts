import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { apiCreateProduct, apiProduct, products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(products);
  }),
  getProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(products)
        .where(eq(products.id, input.id));
    }),
  create: publicProcedure
    .input(apiCreateProduct)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(products).values(input).returning();
    }),
  update: publicProcedure.input(apiProduct).mutation(async ({ ctx, input }) => {
    return await ctx.db
      .update(products)
      .set(input)
      .where(eq(products.id, input.id!))
      .returning();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(products)
        .where(eq(products.id, input.id))
        .returning();
    }),
});
