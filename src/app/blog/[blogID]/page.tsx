"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title, Text, Image } from "@mantine/core";
import { MarkdownDisplay } from "~/app/_components/markdown";
import { api } from "~/trpc/react";

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
          <Text
            c="white"
            fw={800}
          >{`${blogPost.createdAt.toLocaleDateString()}`}</Text>
          <Title order={1} c="white" lh={1} mb="lg">
            {blogPost.title}
          </Title>
          <MarkdownDisplay markdown={blogPost.content} />
        </Stack>
      }
    />
  );
}
