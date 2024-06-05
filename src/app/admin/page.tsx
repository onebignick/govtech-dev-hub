"use client";

import { Button, Group, Stack, Title } from "@mantine/core";
import Shell from "@frontend/_components/shell";
import Link from "next/link";

export default function Admin() {
  return (
    <Shell
      page={
        <Stack>
          <Title order={1}>Admin Panel</Title>
          <Group grow>
            <Button component={Link} href="/admin/users">
              Users
            </Button>
            <Button component={Link} href="/admin/products">
              Products
            </Button>
            <Button component={Link} href="/admin/organisations">
              Organisations
            </Button>
          </Group>
        </Stack>
      }
    />
  );
}
