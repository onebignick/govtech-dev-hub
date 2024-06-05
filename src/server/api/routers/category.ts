import { type Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const inputCategoryItem = z.object({
  label: z.string().min(1),
  product: z.string().min(1),
});

const inputCategory = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  items: z.array(inputCategoryItem),
});

const inputCategoryGroup = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  children: z.array(inputCategory),
  items: z.array(inputCategoryItem),
});

const inputCategories = z.object({
  categories: z.array(inputCategoryGroup),
});

export type CategoriesInput = z.infer<typeof inputCategories>;

export type ProductCategory = Prisma.ProductCategoryGetPayload<{
  include: {
    children: {
      include: { items: { include: { product: { include: { logo: true } } } } };
    };
    items: { include: { product: { include: { logo: true } } } };
  };
}>;

export type ProductCategoryItem = Prisma.ProductCategoryItemGetPayload<{
  include: {
    product: { include: { logo: true } };
  };
}>;

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.productCategory.findMany({
      include: {
        children: {
          include: {
            items: { include: { product: { include: { logo: true } } } },
          },
        },
        items: { include: { product: { include: { logo: true } } } },
      },
      where: {
        parentID: null,
      },
    }),
  ),
  create: protectedProcedure
    .input(inputCategories)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction([
        ctx.db.productCategoryItem.deleteMany(),
        ctx.db.productCategory.deleteMany(),
        ...input.categories.map((category) =>
          ctx.db.productCategory.create({
            data: {
              id: category.name.toLowerCase().trim().replaceAll(" ", "-"),
              name: category.name,
              description: category.description,
              children: {
                create: category.children.map((child) => ({
                  id: child.name.toLowerCase().trim().replaceAll(" ", "-"),
                  name: child.name,
                  description: child.description,
                  items: {
                    create: child.items.map((item) => ({
                      label: item.label,
                      product: {
                        connect: {
                          id: item.product,
                        },
                      },
                    })),
                  },
                })),
              },
              items: {
                create: category.items.map((item) => ({
                  label: item.label,
                  product: {
                    connect: {
                      id: item.product,
                    },
                  },
                })),
              },
            },
          }),
        ),
      ]);
    }),
});
