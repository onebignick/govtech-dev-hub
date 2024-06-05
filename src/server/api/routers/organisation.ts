import { type Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const inputOrganisation = z.object({
  name: z.string().min(1),
  acronym: z.string(),
  parent: z.string().optional(),
});

export type OrganisationInput = z.infer<typeof inputOrganisation>;

export type Organisation = Prisma.OrganisationGetPayload<{
  include: {
    logo: true;
    children: true;
  };
}>;

export const organisationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.db.organisation.findMany({
      include: {
        logo: true,
        children: true,
      },
    }),
  ),
  create: protectedProcedure
    .input(inputOrganisation)
    .mutation(async ({ ctx, input }) => {
      const id = input.name.toLowerCase().trim().replace(" ", "-");

      return ctx.db.organisation.create({
        data: {
          id: id,
          name: input.name,
          acronym: input.acronym,
          parent: input.parent
            ? {
                connect: { id: input.parent },
              }
            : {},
        },
      });
    }),
});
