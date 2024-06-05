import { type Prisma } from "@prisma/client";
import { z } from "zod";
import { cloudinaryUploader } from "~/app/utils/cloudinary";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const inputBlogPost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  cover: z.string().min(1),
  author: z.string(),
});

export type BlogPostInput = z.infer<typeof inputBlogPost>;

export type BlogPost = Prisma.BlogPostGetPayload<{
  include: {
    cover: true;
    author: true;
  };
}>;

export const blogPostRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.blogPost.findFirst({
        where: { id: input.id },
        include: {
          cover: true,
          author: true,
        },
      }),
    ),
  getMetadata: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.blogPost.findFirst({
        where: { id: input.id },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.blogPost.findMany({
      include: {
        cover: true,
        author: true,
      },
    }),
  ),
  create: protectedProcedure
    .input(inputBlogPost)
    .mutation(async ({ ctx, input }) => {
      const id = input.title.toLowerCase().trim().replaceAll(" ", "-");

      return cloudinaryUploader
        .upload(input.cover, {
          width: 1000,
          aspectRatio: 1,
          resize: "scale",
        })
        .then((res) =>
          ctx.db.blogPost.create({
            data: {
              id,
              title: input.title,
              content: input.content,
              cover: {
                create: {
                  publicId: res.public_id,
                  version: `${res.version}`,
                  format: res.format,
                  url: res.url,
                  secureUrl: res.secure_url,
                },
              },
              author: {
                connectOrCreate: {
                  create: { id: input.author },
                  where: { id: input.author },
                },
              },
            },
          }),
        );
    }),
});
