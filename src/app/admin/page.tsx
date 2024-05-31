"use client";

import { Button, Stack } from "@mantine/core";
import Shell from "../_components/shell";
import { api } from "~/trpc/react";

export default function Admin() {
  const createUserMutation = api.user.createUser.useMutation();
  const users = api.user.getAll.useQuery();

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
          <Button onClick={handleCreate}>Generate Data</Button>
          {JSON.stringify(users)}
        </Stack>
      }
    />
  );
}
