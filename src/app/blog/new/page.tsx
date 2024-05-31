"use client";

import Shell from "@frontend/_components/shell";
import {
  Stack,
  Title,
  Button,
  Group,
  TextInput,
  FileInput,
  NativeSelect,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconFile } from "@tabler/icons-react";
import { Editor } from "~/app/_components/editor";
import { api } from "~/trpc/react";

export default function CreateNewProduct() {
  const utils = api.useUtils();
  const createProductMutation = api.product.create.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      type: "product",
      content: "",
    },

    validate: {
      type: isNotEmpty("Type is required"),
      name: isNotEmpty("Name is required"),
      content: isNotEmpty("Content is required"),
    },
  });

  return (
    <Shell
      page={
        <form
          onSubmit={form.onSubmit((values) => {
            createProductMutation.mutate(values);
          })}
        >
          <Stack>
            <Title order={1}>Create New</Title>
            <NativeSelect
              withAsterisk
              key={form.key("type")}
              label="Type"
              description="Is it a full GovTech product? A one-time project for an agency? Or a cool Innersource package?"
              data={[
                { label: "Product", value: "product" },
                { label: "Agency Project", value: "agency-project" },
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
      }
    />
  );
}
