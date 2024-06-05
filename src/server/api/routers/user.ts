import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerk } from "../clerk";

const inputUser = z.string().min(1);

const user = z.object({
  username: z.string(),
  imageUrl: z.string(),
  emailAddresses: z.array(
    z.object({
      emailAddress: z.string(),
    }),
  ),
});

export type User = z.infer<typeof user>;

export const userRouter = createTRPCRouter({
  getClerkUser: publicProcedure
    .input(inputUser)
    .query(async ({ ctx, input }) => clerk.users.getUser(input)),
});
