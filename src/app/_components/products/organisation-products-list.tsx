"use client";

import { Stack, Group, Title, Button, SegmentedControl } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { navLinks } from "../shell";
import { ProductCardsGrid } from "./product-cards-grid";
import classes from "~/styles/title.module.css";
import segmentedClasses from "~/styles/segmented.module.css";
import { type OrganisationProducts } from "~/server/api/routers/organisation";
import { useState } from "react";

export function OrganisationProductsList({
  organisations,
}: {
  organisations: OrganisationProducts[];
}) {
  const [type, setType] = useState("PRODUCT");

  return (
    <Stack>
      <SegmentedControl
        radius="xl"
        size="md"
        data={[
          { label: "Govt Product", value: "PRODUCT" },
          { label: "Agency Project", value: "AGENCY" },
          { label: "Development Tool", value: "DEVTOOL" },
          { label: "Innersource Project", value: "INNERSOURCE" },
          { label: "Prototype", value: "PROTOTYPE" },
        ]}
        onChange={(value) => setType(value)}
        classNames={segmentedClasses}
      />
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
      {organisations.map((organisation) => {
        const orgProducts = organisation.products.filter(
          (product) => product.type === type,
        );

        const hasProducts =
          orgProducts.length > 0 ||
          organisation.children
            .map((child) =>
              child.products.filter((product) => product.type === type),
            )
            .flat().length > 0;

        if (!hasProducts) {
          return null;
        }

        return (
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
            <ProductCardsGrid
              products={organisation.products.filter(
                (product) => product.type === type,
              )}
            />
            <Stack ml="xl">
              {organisation.children.map((childOrg) => {
                const childOrgProducts = childOrg.products.filter(
                  (product) => product.type === type,
                );

                if (childOrgProducts.length === 0) {
                  return null;
                }

                return (
                  <>
                    <Title key={childOrg.id + "-name"} order={3} c="white">
                      {childOrg.name}
                    </Title>
                    <ProductCardsGrid
                      key={childOrg.id + "-grid"}
                      products={childOrgProducts}
                    />
                  </>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
