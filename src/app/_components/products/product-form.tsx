"use client";

import {
  Stack,
  Button,
  Group,
  TextInput,
  FileInput,
  NativeSelect,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFile } from "@tabler/icons-react";
import { Editor } from "~/app/_components/editor";

interface ProductValueStructure {
  id: number;
  name: string;
  type: "product" | "agencyproject" | "innersource";
  createdAt: Date;
  updatedAt: Date | null;
  summary: string;
  content: string;
  owner: number | null;
}

interface ProductFormStructure {
  name: string;
  summary: string;
  type: string;
  content: string;
}

export function ProductForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: ProductValueStructure | null;
  submitForm: (object: ProductFormStructure) => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      name: "",
      summary: "",
      type: "product",
      content: "",
    },
    validate: {
      type: isNotEmpty("Type is required"),
      name: isNotEmpty("Name is required"),
      summary: isNotEmpty("Summary is required"),
      content: isNotEmpty("Content is required"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <NativeSelect
          withAsterisk
          key={form.key("type")}
          label="Type"
          description="Is it a full GovTech product? A one-time project for an agency? Or a cool Innersource package?"
          data={[
            { label: "Product", value: "product" },
            { label: "Agency Project", value: "agencyproject" },
            { label: "Innersource Project", value: "innersource" },
          ]}
          {...form.getInputProps("type")}
        />
        <TextInput
          withAsterisk
          label="Name"
          placeholder="e.g. SHIP-HATS"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <FileInput
          withAsterisk
          leftSection={<IconFile />}
          label="Logo"
          placeholder="Click to upload file"
        />
        <Textarea
          withAsterisk
          label="Summary"
          description="Quick summary to be displayed on the Products page"
          placeholder="SHIP-HATS is a suite of products for GovTech"
          key={form.key("summary")}
          {...form.getInputProps("summary")}
        />
        <Editor
          withAsterisk
          key={form.key("content")}
          label="Content"
          description="Write out the Overview page"
          {...form.getInputProps("content")}
        />
        <TextInput
          withAsterisk
          label="Contact Points"
          description="To be displayed on the page"
          placeholder="e.g. Jason Tan"
          key={form.key("contact")}
          {...form.getInputProps("contact")}
        />
        <TextInput
          withAsterisk
          label="Owner"
          description="User who owns the page"
          placeholder="e.g. Jason Tan"
          key={form.key("owner")}
          {...form.getInputProps("owner")}
        />
        <TextInput
          withAsterisk
          label="Admins"
          description="Users who are able to manage the page"
          placeholder="e.g. Jason Tan"
          key={form.key("admin")}
          {...form.getInputProps("admin")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
