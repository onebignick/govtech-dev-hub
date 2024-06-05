import { ActionIcon, Button, Group, Input, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type ProductInput } from "~/server/api/routers/product";

function FeatureInput({
  form,
  index,
}: {
  form: UseFormReturnType<ProductInput>;
  index: number;
}) {
  return (
    <Group mt="xs">
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
  );
}

export function ProductFeaturesInput({
  form,
}: {
  form: UseFormReturnType<ProductInput>;
}) {
  return (
    <Input.Wrapper
      label="Key Features"
      description="List down your key features"
      key={form.key("features")}
      {...form.getInputProps(`features`)}
    >
      {form.getValues().features.map((item, index) => (
        <FeatureInput key={`features.${index}`} form={form} index={index} />
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
}
