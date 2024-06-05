import { NativeSelect } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { api } from "~/trpc/react";
import { LoaderDisplay } from "../loader";
import { type ProductInput } from "~/server/api/routers/product";

export function ProductOrganisationInput({
  form,
}: {
  form: UseFormReturnType<ProductInput>;
}) {
  const organisationsRes = api.organisation.getAll.useQuery();

  if (!organisationsRes.data) {
    return <LoaderDisplay />;
  }

  const organisations = organisationsRes.data;

  return (
    <NativeSelect
      withAsterisk
      key={form.key("organisationId")}
      label="Organisation"
      description="GovTech Products & Agency Projects need to include the organisation"
      data={[
        { label: "", value: "" },
        ...organisations.map((organisation) => ({
          label: organisation.name,
          value: organisation.id,
        })),
      ]}
      {...form.getInputProps("organisationId")}
    />
  );
}
