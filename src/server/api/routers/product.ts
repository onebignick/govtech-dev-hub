import { type Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const inputProduct = z.object({
  id: z.string(),
  name: z.string().min(1).max(32),
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export type ProductInput = z.infer<typeof inputProduct>;

export type Product = Prisma.ProductGetPayload<{
  include: { features: true };
}>;

export const productRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          features: true,
        },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.product.findMany()),
  create: publicProcedure.input(inputProduct).mutation(async ({ ctx, input }) =>
    ctx.db.product.create({
      data: {
        id: input.id,
        name: input.name,
        features: {
          create: input.features,
        },
      },
    }),
  ),
});
