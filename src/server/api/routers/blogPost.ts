import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const inputBlogPost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type BlogPostInput = z.infer<typeof inputBlogPost>;

export const blogPostRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.blogPost.findFirst({
        where: { id: input.id },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.blogPost.findMany()),
  create: publicProcedure
    .input(inputBlogPost)
    .mutation(async ({ ctx, input }) => {
      const id = input.title.toLowerCase().trim().replace(" ", "-");

      return ctx.db.blogPost.create({
        data: {
          id,
          title: input.title,
          content: input.content,
          author: {
            connect: {
              id: "",
            },
          },
        },
      });
    }),
});
