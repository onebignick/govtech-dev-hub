"use client";

import { zodResolver } from "mantine-form-zod-resolver";
import { useUser } from "@clerk/nextjs";
import {
  Stack,
  Button,
  Group,
  TextInput,
  FileInput,
  NativeSelect,
  Textarea,
  ActionIcon,
  Input,
  Fieldset,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  IconArrowDown,
  IconArrowUp,
  IconFile,
  IconTrash,
} from "@tabler/icons-react";
import {
  type Product,
  quarterEnum,
  type apiCreateProductType,
} from "~/server/db/schema";

export function ProductForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: Product | null;
  submitForm: (object: apiCreateProductType) => void;
}) {
  const { user } = useUser();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      id: "",
      name: "",
      summary: "",
      type: "product",
      keyfeatures: [{ title: "", description: "" }],
      highlights: [],
    },
    validate: {
      type: isNotEmpty("Type is required"),
      name: isNotEmpty("Name is required"),
      summary: isNotEmpty("Summary is required"),
    },
  });

  const keyFeaturesField = (
    <Input.Wrapper
      label="Key Features"
      description="List down your key features"
      key={`keyfeatures`}
      {...form.getInputProps(`keyfeatures`)}
    >
      {(form.getValues().keyfeatures ?? []).map((item, index) => (
        <Group mt="xs" key={`keyfeatures.${index}`}>
          <TextInput
            placeholder="Title"
            withAsterisk
            style={{ flex: 1 }}
            key={form.key(`keyfeatures.${index}.title`)}
            {...form.getInputProps(`keyfeatures.${index}.title`)}
          />
          <TextInput
            placeholder="Description"
            withAsterisk
            style={{ flex: 2 }}
            key={form.key(`keyfeatures.${index}.description`)}
            {...form.getInputProps(`keyfeatures.${index}.description`)}
          />
          <ActionIcon
            color="red"
            onClick={() => form.removeListItem("keyfeatures", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("keyfeatures", {
              title: "",
              description: "",
            })
          }
        >
          Add Key Feature
        </Button>
      </Group>
    </Input.Wrapper>
  );

  const highlightsField = (
    <Input.Wrapper
      label="Highlights"
      description="List down your highlights"
      key={`highlights`}
      {...form.getInputProps(`highlights`)}
    >
      {(form.getValues().highlights ?? []).map((item, index) => (
        <Fieldset
          mt="xs"
          key={`highlights.${index}`}
          legend="Quarterly Highlight"
        >
          <Group>
            <NativeSelect
              withAsterisk
              key={form.key(`highlights.${index}.quarter`)}
              data={quarterEnum.enumValues}
              {...form.getInputProps(`highlights.${index}.quarter`)}
            />
            <ActionIcon
              color="red"
              onClick={() => form.removeListItem("highlights", index)}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
            {index > 0 && (
              <ActionIcon
                variant="light"
                onClick={() =>
                  form.reorderListItem(`highlights`, {
                    from: index,
                    to: index - 1,
                  })
                }
              >
                <IconArrowUp size="1rem" />
              </ActionIcon>
            )}
            {index < (form.getValues().highlights ?? []).length - 1 && (
              <ActionIcon
                variant="light"
                onClick={() =>
                  form.reorderListItem(`highlights`, {
                    from: index,
                    to: index + 1,
                  })
                }
              >
                <IconArrowDown size="1rem" />
              </ActionIcon>
            )}
          </Group>
          <Stack my="sm" gap={2}>
            {(item.points ?? []).map((item, pointIndex) => (
              <Group mt="xs" key={`highlights.${index}.points.${pointIndex}`}>
                <TextInput
                  placeholder="Point"
                  withAsterisk
                  style={{ flex: 1 }}
                  key={form.key(`highlights.${index}.points.${pointIndex}`)}
                  {...form.getInputProps(
                    `highlights.${index}.points.${pointIndex}`,
                  )}
                />
                <ActionIcon
                  color="red"
                  onClick={() =>
                    form.removeListItem(`highlights.${index}.points`, index)
                  }
                >
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Group>
            ))}
          </Stack>
          <Group justify="center" mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem(`highlights.${index}.points`, "")
              }
            >
              Add Point
            </Button>
          </Group>
        </Fieldset>
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("highlights", {
              quarter: "",
              points: [""],
            })
          }
        >
          Add Quarter
        </Button>
      </Group>
    </Input.Wrapper>
  );

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submitForm({ ...values, type: "product", admins: user!.id });
      })}
    >
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
          label="ID"
          placeholder="e.g. ship-hats"
          description="Only accepts lowercase letters and numbers. No spaces or uppercase."
          key={form.key("id")}
          {...form.getInputProps("id")}
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
          description="Upload a square icon"
          placeholder="Click to upload file"
        />
        <FileInput
          withAsterisk
          leftSection={<IconFile />}
          label="Cover"
          description="Upload a 16:9 image"
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
        {keyFeaturesField}
        {highlightsField}
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
