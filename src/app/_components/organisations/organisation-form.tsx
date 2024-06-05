"use client";

import { Stack, Button, Group, TextInput, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { type OrganisationInput } from "~/server/api/routers/organisation";
import { OrganiationParentInput } from "./organisation-parent-input";

export function OrganisationForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: OrganisationInput | null;
  submitForm: (object: OrganisationInput) => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      name: "",
      acronym: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      acronym: isNotEmpty("Acronym is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="e.g. Government Digital Products"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Acronym"
          placeholder="e.g. GDP"
          key={form.key("acronym")}
          {...form.getInputProps("acronym")}
        />
        <OrganiationParentInput form={form} />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 90 }}
          >
            {initialValues ? "Save" : "Submit"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
