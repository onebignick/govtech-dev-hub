"use client";

import { Button, Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import { api } from "~/trpc/react";
import { UsersTable } from "@frontend/_components/admin/user-table";
import Link from "next/link";

export default function Admin() {
  const createUserMutation = api.user.createUser.useMutation();

  const handleCreate = () => {
    createUserMutation.mutate({
      email: "daniel@radcliffe.com",
      name: "Daniel",
    });
  };

  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Title order={1}>Product Management</Title>
          <Button component={Link} href="/products/new">
            Create New
          </Button>
          <UsersTable />
        </Stack>
      }
    />
  );
}
