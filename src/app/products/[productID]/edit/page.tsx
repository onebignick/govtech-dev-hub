import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EditProduct from "~/app/_components/products/edit-product-form";
import { navLinks } from "~/app/_components/shell";
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

export default async function AdminEditProduct({
  params,
}: {
  params: { productID: string };
}) {
  const clerkAuth = auth();

  return api.product
    .get({
      id: params.productID,
    })
    .then((product) => {
      if (
        product?.admins.findIndex((admin) => admin.id === clerkAuth.userId) ===
        -1
      ) {
        redirect(navLinks.products!.link);
      }

      return product ? <EditProduct product={product} /> : null;
    });
}
