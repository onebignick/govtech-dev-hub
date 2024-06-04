import { type Prisma } from "@prisma/client";
import { z } from "zod";
import { cloudinaryUploader } from "~/app/utils/cloudinary";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const inputProduct = z.object({
  id: z.string(),
  type: z.enum(["PRODUCT", "AGENCY", "PROTOTYPE", "INNERSOURCE"]),
  name: z.string().min(1).max(32),
  oneLiner: z.string(),
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
  admins: z.array(z.string()),
  logo: z.string(),
  cover: z.string().optional(),
});

export type ProductInput = z.infer<typeof inputProduct>;

export type Product = Prisma.ProductGetPayload<{
  include: { features: true; changelogs: true; logo: true; cover: true };
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
          logo: true,
          cover: true,
        },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.product.findMany({
      include: {
        logo: true,
        cover: true,
      },
    }),
  ),
  create: publicProcedure
    .input(inputProduct)
    .mutation(async ({ ctx, input }) => {
      return Promise.all([
        cloudinaryUploader.upload(input.logo, {
          width: 1000,
          aspectRatio: 1,
          resize: "scale",
        }),
        input.cover
          ? cloudinaryUploader.upload(input.cover, {
              width: 1500,
              aspectRatio: 16 / 9,
              resize: "scale",
            })
          : null,
      ]).then((responses) => {
        return ctx.db.product.create({
          data: {
            id: input.id,
            type: input.type,
            name: input.name,
            oneLiner: input.oneLiner,
            summary: input.summary,
            features: {
              create: input.features,
            },
            changelogs: {
              create: input.changelogs,
            },
            admins: {
              connectOrCreate: input.admins.map((admin) => {
                return {
                  create: { clerkUserId: admin },
                  where: { clerkUserId: admin },
                };
              }),
            },
            logo: {
              create: {
                publicId: responses[0].public_id,
                version: `${responses[0].version}`,
                format: responses[0].format,
                url: responses[0].url,
                secureUrl: responses[0].secure_url,
              },
            },
            cover: responses[1]
              ? {
                  create: {
                    publicId: responses[1].public_id,
                    version: `${responses[1].version}`,
                    format: responses[1].format,
                    url: responses[1].url,
                    secureUrl: responses[1].secure_url,
                  },
                }
              : {},
          },
        });
      });
    }),
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
