"use client";

import { useUser } from "@clerk/nextjs";
import { Stack, Button, Group, TextInput, FileInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFile } from "@tabler/icons-react";
import { Editor } from "~/app/_components/editor";
import { type BlogPostInput } from "~/server/api/routers/blogPost";

export function BlogPostForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: BlogPostInput | null;
  submitForm: (object: BlogPostInput) => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      title: "",
      content: "",
      author: "",
    },
    validate: {
      title: isNotEmpty("Summary is required"),
      content: isNotEmpty("Content is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="e.g. Why Langchain isn't the way to do"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <FileInput
          withAsterisk
          leftSection={<IconFile />}
          label="Cover Image"
          placeholder="Click to upload file"
        />
        <Editor
          withAsterisk
          key={form.key("content")}
          label="Content"
          {...form.getInputProps("content")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
