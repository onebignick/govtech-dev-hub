import { type Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const inputProduct = z.object({
  id: z.string(),
  name: z.string().min(1).max(32),
  summary: z.string(),
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  changelogs: z.array(
    z.object({
      quarter: z.string(),
      changes: z.array(z.string()),
    }),
  ),
});

export type ProductInput = z.infer<typeof inputProduct>;

export type Product = Prisma.ProductGetPayload<{
  include: { features: true; changelogs: true };
}>;

export const productRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.product.findFirst({
        where: { id: input.id },
        include: {
          features: true,
          changelogs: true,
        },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.product.findMany()),
  create: publicProcedure.input(inputProduct).mutation(async ({ ctx, input }) =>
    ctx.db.product.create({
      data: {
        id: input.id,
        name: input.name,
        summary: input.summary,
        features: {
          create: input.features,
        },
        changelogs: {
          create: input.changelogs,
        },
        admins: {
          create: [],
        },
      },
    }),
  ),
  update: publicProcedure.input(inputProduct).mutation(async ({ ctx, input }) =>
    ctx.db.product.update({
      data: {
        id: input.id,
        name: input.name,
        summary: input.summary,
      },
      where: { id: input.id },
    }),
  ),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleteFeatures = ctx.db.feature.deleteMany({
        where: {
          productId: input.id,
        },
      });
      const deleteChangelogs = ctx.db.changelog.deleteMany({
        where: {
          productId: input.id,
        },
      });

      const deleteProduct = ctx.db.product.delete({
        where: { id: input.id },
      });

      return ctx.db
        .$transaction([deleteFeatures, deleteChangelogs, deleteProduct])
        .catch((error) => console.log(error));
    }),
});
