import { type Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const voteIdea = z.object({
  id: z.number(),
  users: z.array(z.string()),
});

const editIdea = z.object({
  id: z.number(),
  title: z.string().min(1),
  content: z.string(),
});

const inputIdea = z.object({
  title: z.string().min(1),
  content: z.string(),
  creator: z.string(),
});

export type IdeaInput = z.infer<typeof inputIdea>;

export type Idea = Prisma.IdeaGetPayload<{
  include: {
    creator: true;
    upvoted: true;
    downvoted: true;
    _count: {
      select: {
        upvoted: true;
      };
    };
  };
}>;

export const ideaRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) =>
      ctx.db.idea.findFirst({
        where: { id: input.id },
        include: {
          creator: true,
          upvoted: true,
          downvoted: true,
        },
      }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.idea.findMany({
      include: {
        creator: true,
        upvoted: true,
        downvoted: true,
        _count: {
          select: {
            upvoted: true,
          },
        },
      },
    }),
  ),
  create: protectedProcedure
    .input(inputIdea)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.idea.create({
        data: {
          title: input.title,
          content: input.content,
          creator: {
            connectOrCreate: {
              create: { id: input.creator },
              where: { id: input.creator },
            },
          },
        },
      });
    }),
  edit: protectedProcedure.input(editIdea).mutation(async ({ ctx, input }) => {
    return ctx.db.idea.update({
      data: {
        title: input.title,
        content: input.content,
      },
      where: {
        id: input.id,
      },
    });
  }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.idea.delete({
        where: {
          id: input,
        },
      });
    }),
  upvote: protectedProcedure
    .input(voteIdea)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.idea.update({
        data: {
          upvoted: {
            connect: input.users.map((id) => ({
              id,
            })),
          },
        },
        where: {
          id: input.id,
        },
      });
    }),
  downvote: protectedProcedure
    .input(voteIdea)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.idea.update({
        data: {
          upvoted: {
            disconnect: input.users.map((id) => ({
              id,
            })),
          },
        },
        where: {
          id: input.id,
        },
      });
    }),
});
