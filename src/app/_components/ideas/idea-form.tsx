"use client";

import {
  Stack,
  Button,
  Group,
  TextInput,
  FileInput,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFile } from "@tabler/icons-react";
import { Editor } from "~/app/_components/editor";
import { type IdeaInput } from "~/server/api/routers/idea";

export function IdeaForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: IdeaInput | null;
  submitForm: (object: IdeaInput) => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      title: "",
      content: "",
      creator: "",
    },
    validate: {
      title: isNotEmpty("Title is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="e.g. Issue all devs with GoMax iPads"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Extra Information"
          description="Any extra info to display on the details page"
          placeholder="e.g. Most devs only use their GSIB for emails and intranet portals. Allow all devs to use iPads to read their emails instead, so they can check emails more often and easier."
          key={form.key("content")}
          {...form.getInputProps("content")}
        />
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
