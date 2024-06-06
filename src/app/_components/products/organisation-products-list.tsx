"use client";

import { Stack, Group, Title, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { navLinks } from "../shell";
import { ProductCardsGrid } from "./product-cards-grid";
import classes from "~/styles/title.module.css";
import { type OrganisationProducts } from "~/server/api/routers/organisation";

export function OrganisationProductsList({
  organisations,
}: {
  organisations: OrganisationProducts[];
}) {
  return (
    <Stack>
      <Group justify="space-between" mb="md">
        <Title order={1} c="white" className={classes.titleUnderline}>
          GovTech Products
        </Title>
        <Button
          component={Link}
          href={navLinks.createProducts!.link}
          leftSection={<IconPlus />}
          variant="gradient"
          gradient={{ from: "indigo", to: "violet", deg: 90 }}
        >
          Create
        </Button>
      </Group>
      {organisations.map((organisation) =>
        organisation.products.length > 0 ||
        organisation.children.map((child) => child.products).flat().length >
          0 ? (
          <Stack key={organisation.id}>
            <Title
              order={2}
              c="white"
              className={
                organisation.name === "Others"
                  ? classes.titleUnderline
                  : undefined
              }
            >
              {organisation.name === "Others"
                ? "Non-GovTech Products"
                : organisation.name}
            </Title>
            <ProductCardsGrid products={organisation.products} />
            <Stack ml="xl">
              {organisation.children.map((childOrg) =>
                childOrg.products.length > 0 ? (
                  <>
                    <Title order={3} c="white">
                      {childOrg.name}
                    </Title>
                    <ProductCardsGrid products={childOrg.products} />
                  </>
                ) : null,
              )}
            </Stack>
          </Stack>
        ) : null,
      )}
    </Stack>
  );
}
