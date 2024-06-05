import { NativeSelect } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { type OrganisationInput } from "~/server/api/routers/organisation";
import { api } from "~/trpc/react";
import { LoaderDisplay } from "../loader";

export function OrganiationParentInput({
  form,
}: {
  form: UseFormReturnType<OrganisationInput>;
}) {
  const organisationsRes = api.organisation.getAll.useQuery();

  if (!organisationsRes.data) {
    return <LoaderDisplay />;
  }

  const organisations = organisationsRes.data;

  return (
    <NativeSelect
      key={form.key("parent")}
      label="Parent Organisation"
      description="Does this organisation have a parent?"
      data={[
        { label: "", value: "" },
        ...organisations.map((organisation) => ({
          label: organisation.name,
          value: organisation.id,
        })),
      ]}
      {...form.getInputProps("parent")}
    />
  );
}
