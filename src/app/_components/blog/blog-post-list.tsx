"use client";

import { Button, Group, Stack, Title } from "@mantine/core";
import { BlogPostPreviewCard } from "./blog-post-preview-card";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import Shell, { navLinks } from "../shell";
import classes from "~/styles/title.module.css";
import { type BlogPost } from "~/server/api/routers/blogPost";

export function BlogPostList({ blogPosts }: { blogPosts: BlogPost[] }) {
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
          {blogPosts.map((blogPost) => (
            <BlogPostPreviewCard blogPost={blogPost} key={blogPost.id} />
          ))}
        </Stack>
      }
    />
  );
}
