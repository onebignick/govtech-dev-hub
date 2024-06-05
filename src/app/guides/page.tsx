import { GuideDisplay } from "../_components/guides/guide-page";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { LoaderShell } from "../_components/loader";

export default async function Guides() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.category.getAll().then((categories) => (
        <GuideDisplay categories={categories} />
      ))}
    </Suspense>
  );
}
