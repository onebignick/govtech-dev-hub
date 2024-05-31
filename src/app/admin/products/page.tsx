"use client";

import { Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import { ProductsTable } from "~/app/_components/admin/product-table";

export default function Admin() {
  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Title order={1}>Product Management</Title>
          <ProductsTable />
        </Stack>
      }
    />
  );
}
