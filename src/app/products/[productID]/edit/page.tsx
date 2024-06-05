import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const auth = useAuth();
  const router = useRouter();

  return api.product
    .get({
      id: params.productID,
    })
    .then((product) => {
      if (
        product?.admins.findIndex((admin) => admin.id === auth.userId) === -1
      ) {
        router.push(navLinks.products!.link);

        return null;
      }

      return product ? <EditProduct product={product} /> : null;
    });
}
