"use client";

import { Button, Stack, Title } from "@mantine/core";
import Shell from "@frontend/_components/shell";
import { api } from "~/trpc/react";
import { UsersTable } from "@frontend/_components/admin/user-table";

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
      page={
        <Stack>
          <Title order={1}>Products</Title>
          <Button onClick={handleCreate}>Generate Data</Button>
          <UsersTable />
        </Stack>
      }
    />
  );
}
