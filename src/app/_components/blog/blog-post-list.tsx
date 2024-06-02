import { Stack, Title, Text, Space } from "@mantine/core";
import { type BlogPost } from "@prisma/client";
import { api } from "~/trpc/react";

export function BlogPostList() {
  const blogPostsRes = api.blogPost.getAll.useQuery();

  if (!blogPostsRes.data) {
    return <div>Loading...</div>;
  }

  const blogPosts = blogPostsRes.data;

  const BlogPostItem = ({ blogPost }: { blogPost: BlogPost }) => (
    <Stack>
      <Title order={2}>{blogPost.title}</Title>
      <Text>{blogPost.content}</Text>
      <Space h="md" />
    </Stack>
  );

  return (
    <Stack>
      {blogPosts.map((blogPost) => (
        <BlogPostItem blogPost={blogPost} key={blogPost.id} />
      ))}
    </Stack>
  );
}
