"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title, Text, Image, Badge, Space } from "@mantine/core";
import { MarkdownDisplay } from "~/app/_components/markdown";
import { api } from "~/trpc/react";
import classes from "~/styles/title.module.css";
import { DateTime } from "luxon";
import { UserDisplay } from "~/app/_components/userDisplay";
import { LoaderShell } from "~/app/_components/loader";
import { BlogPost } from "~/server/api/routers/blogPost";
import { DateBadge } from "../date-badge";

export default function BlogPostDisplay({ blogPost }: { blogPost: BlogPost }) {
  return (
    <Shell
      backLink={navLinks.blog}
      page={
        <Stack my="xl" gap={0}>
          <Image
            src={blogPost.cover!.url}
            alt={`Cover for ${blogPost.title}`}
            my="lg"
          />
          <DateBadge date={blogPost.createdAt} format={DateTime.DATE_MED} />
          <Title
            mt="sm"
            order={1}
            c="white"
            lh={1}
            mb="lg"
            className={classes.titleUnderline}
          >
            {blogPost.title}
          </Title>
          <UserDisplay userID={blogPost.authorID} />
          <Space h="md" />
          <MarkdownDisplay markdown={blogPost.content} />
        </Stack>
      }
    />
  );
}
