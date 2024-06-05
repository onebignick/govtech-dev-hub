import { type Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
    children: true;
    items: true;
  };
}>;

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.productCategory.findMany({
      include: {
        children: true,
        items: true,
      },
    }),
  ),
  create: publicProcedure
    .input(inputCategories)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.productCategory.createMany({
        data: input.categories.map((category) => {
          const id = category.name.toLowerCase().trim().replace(" ", "-");
          return {
            id,
            name: category.name,
            description: category.description,
            children: {
              data: {
                create: category.children,
              },
            },
            items: category.items.map((item) => ({
              data: {
                label: item.label,
                product: {
                  connect: {
                    id: item.product,
                  },
                },
              },
            })),
          };
        }),
      });
    }),
});
