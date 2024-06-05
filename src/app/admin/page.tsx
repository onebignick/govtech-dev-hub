"use client";

import { Button, Group, Stack, Title } from "@mantine/core";
import Shell from "@frontend/_components/shell";
import Link from "next/link";
import titleClasses from "~/styles/title.module.css";

export default function Admin() {
  return (
    <Shell
      page={
        <Stack>
          <Title order={1} c="white" className={titleClasses.titleUnderline}>
            Admin Panel
          </Title>
          <Group grow>
            <Button
              component={Link}
              href="/admin/users"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Users
            </Button>
            <Button
              component={Link}
              href="/admin/products"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Products
            </Button>
            <Button
              component={Link}
              href="/admin/organisations"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Organisations
            </Button>
            <Button
              component={Link}
              href="/admin/categories"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Categories
            </Button>
          </Group>
        </Stack>
      }
    />
  );
}
