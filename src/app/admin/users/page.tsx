"use client";

import { Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import { UsersTable } from "@frontend/_components/admin/user-table";

export default function Admin() {
  /*const createUserMutation = api.user.createUser.useMutation({
    onSuccess() {
      utils.user.invalidate().catch((error) => console.log(error));
    },
  });

  const handleCreate = () => {
    createUserMutation.mutate(
      {
        email: "daniel@radcliffe.com",
        name: "Daniel",
      },
      {
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };*/

  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Title order={1}>User Management</Title>
          <UsersTable />
        </Stack>
      }
    />
  );
}
