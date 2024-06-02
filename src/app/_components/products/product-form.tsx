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
import { type ProductInput } from "~/server/api/routers/product";

export function ProductForm({
  submitForm,
}: {
  submitForm: (object: ProductInput) => void;
}) {
  const form = useForm<ProductInput>({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      name: "",
      features: [],
    },
    validate: {
      name: isNotEmpty("Name is required"),
    },
  });

  const featuresField = (
    <Input.Wrapper
      label="Key Features"
      description="List down your key features"
      key={`features`}
      {...form.getInputProps(`features`)}
    >
      {form.getValues().features.map((item, index) => (
        <Group mt="xs" key={`features.${index}`}>
          <TextInput
            placeholder="Title"
            withAsterisk
            style={{ flex: 1 }}
            key={form.key(`features.${index}.title`)}
            {...form.getInputProps(`features.${index}.title`)}
          />
          <TextInput
            placeholder="Description"
            withAsterisk
            style={{ flex: 2 }}
            key={form.key(`features.${index}.description`)}
            {...form.getInputProps(`features.${index}.description`)}
          />
          <ActionIcon
            color="red"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onClick={() => form.removeListItem("features", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("features", {
              id: 0,
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

  /*
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
  );*/

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submitForm({ ...values });
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
        {featuresField}
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
