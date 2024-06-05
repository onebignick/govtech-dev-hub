import { NativeSelect } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { type OrganisationInput } from "~/server/api/routers/organisation";
import { api } from "~/trpc/react";

export function OrganiationParentInput({
  form,
}: {
  form: UseFormReturnType<OrganisationInput>;
}) {
  const organisationsRes = api.organisation.getAll.useQuery();

  if (!organisationsRes.data) {
    return <div>Loading...</div>;
  }

  const organisations = organisationsRes.data;

  return (
    <NativeSelect
      withAsterisk
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
