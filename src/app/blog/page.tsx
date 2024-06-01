"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function BlogPosts() {
  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between">
            <Title order={1}>Dev Blog</Title>
            <Button
              component={Link}
              href={navLinks.createProducts!.link}
              leftSection={<IconPencil />}
            >
              New Post
            </Button>
          </Group>
        </Stack>
      }
    />
  );
}
