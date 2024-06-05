"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title, Text, Image, Badge, Space } from "@mantine/core";
import { MarkdownDisplay } from "~/app/_components/markdown";
import { api } from "~/trpc/react";
import classes from "~/styles/title.module.css";
import { DateTime } from "luxon";
import { UserDisplay } from "~/app/_components/userDisplay";

export default function AdminEditProduct({
  params,
}: {
  params: { blogID: string };
}) {
  const blogPostRes = api.blogPost.get.useQuery({
    id: decodeURI(params.blogID),
  });

  if (!blogPostRes.data) {
    return <div>Loading...</div>;
  }

  const blogPost = blogPostRes.data;

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
          <Badge
            variant="gradient"
            gradient={{ from: "violet", to: "indigo", deg: 90 }}
            mb="md"
          >
            {DateTime.fromJSDate(blogPost.createdAt).toLocaleString(
              DateTime.DATE_MED,
            )}
          </Badge>
          <Title
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
