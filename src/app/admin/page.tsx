"use client";

import { Button, Stack } from "@mantine/core";
import Shell from "../_components/shell";
import { api } from "~/trpc/react";
import { UsersTable } from "../_components/admin/user-table";
import Link from "next/link";

export default function Admin() {
  return (
    <Shell
      page={
        <Stack>
          <Link href="./admin/users">
            <Button>Users</Button>
          </Link>
        </Stack>
      }
    />
  );
}
