import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { apiCreateUser, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
  create: publicProcedure
    .input(apiCreateUser)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(users).values({
        name: input.name,
      });
    }),
});
