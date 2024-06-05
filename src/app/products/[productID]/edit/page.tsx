import { Suspense } from "react";
import { LoaderShell } from "~/app/_components/loader";
import EditProduct from "~/app/_components/products/edit-product-form";
import { api } from "~/trpc/server";

export async function generateMetadata({
  params,
}: {
  params: { productID: string };
}) {
  return api.product
    .get({
      id: decodeURI(params.productID),
    })
    .then((product) => ({
      title: `Edit ${product?.name}`,
    }));
}

export default function AdminEditProduct({
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
        .then((product) =>
          product ? <EditProduct product={product} /> : null,
        )}
    </Suspense>
  );
}
