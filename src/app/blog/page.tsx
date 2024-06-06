import { BlogPostList } from "../_components/blog/blog-post-list";
import { Suspense } from "react";
import { LoaderShell } from "../_components/loader";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Dev Blog",
};

export default async function BlogPosts() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.blogPost.getAll().then((blogPosts) => (
        <BlogPostList
          blogPosts={blogPosts.sort((a, b) =>
            a.createdAt > b.createdAt ? -1 : 0,
          )}
        />
      ))}
    </Suspense>
  );
}
