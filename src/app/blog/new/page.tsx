"use client";

import { useAuth } from "@clerk/nextjs";
import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { BlogPostForm } from "~/app/_components/blog/blog-post-form";
import { api } from "~/trpc/react";

export default function CreateNewProduct() {
  const router = useRouter();
  const createBlogPostMutation = api.blogPost.create.useMutation();

  const auth = useAuth();

  return (
    <Shell
      backLink={navLinks.blog}
      page={
        <Stack>
          <Title order={1}>Create New</Title>
          <BlogPostForm
            submitForm={(values) => {
              console.log(values);

              createBlogPostMutation.mutate(
                {
                  ...values,
                  author: auth.userId ?? "",
                },
                {
                  onError: (error) => console.log(error),
                  onSuccess: () => router.push(navLinks.blog!.link),
                },
              );
            }}
          />
        </Stack>
      }
    />
  );
}
