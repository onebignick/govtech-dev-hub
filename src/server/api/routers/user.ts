import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { apiCreateUser, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(users);
  }),
  createUser: publicProcedure
    .input(apiCreateUser)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(users).values(input).returning();
    }),
});
