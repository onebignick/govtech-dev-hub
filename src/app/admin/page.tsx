"use client";

import { Button, Stack } from "@mantine/core";
import Shell from "@frontend/_components/shell";
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
