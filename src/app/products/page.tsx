import Shell from "@frontend/_components/shell";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { LoaderShell } from "../_components/loader";
import { OrganisationProductsList } from "../_components/products/organisation-products-list";

export const metadata = {
  title: "GovTech Products",
};

export default async function Products() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {
        /*api.product.getAll().then((products) => (
        <Shell page={<ProductsList products={products} />} />
      ))*/
        api.organisation.getProducts().then((organisations) => (
          <Shell
            page={<OrganisationProductsList organisations={organisations} />}
          />
        ))
      }
    </Suspense>
  );
}
