import { Suspense } from "react";
import { LoaderShell } from "~/app/_components/loader";
import ProductComponent from "~/app/_components/products/product";
import { api } from "~/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: { productID: string };
}) {
  return api.product
    .get({
      id: params.productID,
    })
    .then((product) => ({
      title: product?.name,
      description: product?.oneLiner,
    }));
}

export default async function ProductServerPage({
  params,
}: {
  params: { productID: string };
}) {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.product
        .get({
          id: params.productID,
        })
        .then((product) => (
          <ProductComponent product={product} />
        ))}
    </Suspense>
  );
}
