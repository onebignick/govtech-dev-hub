import { Stack } from "@mantine/core";
import { api } from "~/trpc/react";
import { BlogPostPreviewCard } from "./blog-post-preview-card";
import { LoaderDisplay } from "../loader";

export function BlogPostList() {
  const blogPostsRes = api.blogPost.getAll.useQuery();

  if (!blogPostsRes.data) {
    return <LoaderDisplay />;
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
