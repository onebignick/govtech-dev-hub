"use client";

import classes from "~/styles/title.module.css";
import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { BlogPostList } from "../_components/blog/blog-post-list";

export default function BlogPosts() {
  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between">
            <Title order={1} c="white" className={classes.titleUnderline}>
              Dev Blog
            </Title>
            <Button
              component={Link}
              href={navLinks.createBlogPost!.link}
              leftSection={<IconPencil />}
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Create
            </Button>
          </Group>
          <BlogPostList />
        </Stack>
      }
    />
  );
}
