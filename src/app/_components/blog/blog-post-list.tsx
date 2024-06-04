import { Stack, Title, Text, Space } from "@mantine/core";
import { type BlogPost } from "@prisma/client";
import { api } from "~/trpc/react";
import { BlogPostPreviewCard } from "./blog-post-preview-card";

export function BlogPostList() {
  const blogPostsRes = api.blogPost.getAll.useQuery();

  if (!blogPostsRes.data) {
    return <div>Loading...</div>;
  }

  const blogPosts = blogPostsRes.data;

  return (
    <Stack>
      {blogPosts.map((blogPost) => (
        <BlogPostPreviewCard blogPost={blogPost} key={blogPost.id} />
      ))}
    </Stack>
  );
}
