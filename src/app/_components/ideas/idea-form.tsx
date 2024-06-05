"use client";

import { Stack, Button, Group, TextInput, Textarea, Text } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { type IdeaInput } from "~/server/api/routers/idea";

export function IdeaForm({
  initialValues = null,
  handleDelete = null,
  close,
  submitForm,
}: {
  initialValues?: IdeaInput | null;
  handleDelete?: (() => void) | null;
  submitForm: (object: IdeaInput) => void;
  close: () => void;
}) {
  const [clickedDelete, setClicks] = useState<number>(0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      title: "",
      content: "",
      creator: "",
    },
    validate: {
      title: isNotEmpty("Title is required"),
      content: (value) =>
        value.length > 200 ? "Please type less than 250 characters" : null,
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
          {clickedDelete > 0 && (
            <Text c="white">
              Are you sure you want to delete? This is irreversible. Click
              Delete again to confirm.
            </Text>
          )}
          {handleDelete && (
            <Button
              onClick={
                clickedDelete > 0
                  ? handleDelete
                  : () => setClicks(clickedDelete + 1)
              }
              variant="filled"
              color="red"
            >
              Delete
            </Button>
          )}
          <Button onClick={close} variant="filled" color="gray">
            Cancel
          </Button>
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
