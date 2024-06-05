import { LoaderShell } from "~/app/_components/loader";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import BlogPostDisplay from "~/app/_components/blog/blog-post";

export async function generateMetadata({
  params,
}: {
  params: { blogID: string };
}) {
  return api.blogPost
    .getMetadata({
      id: decodeURI(params.blogID),
    })
    .then((blogPost) => {
      console.log(blogPost);
      return {
        title: blogPost?.title,
      };
    });
}

export default async function BlogPost({
  params,
}: {
  params: { blogID: string };
}) {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.blogPost
        .get({
          id: decodeURI(params.blogID),
        })
        .then((blogPost) => (
          <BlogPostDisplay blogPost={blogPost} />
        ))}
    </Suspense>
  );
}
