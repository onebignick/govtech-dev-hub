import { ActionIcon, Button, Group, Input, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconLink, IconTrash } from "@tabler/icons-react";
import { type ProductInput } from "~/server/api/routers/product";

function LinkInput({
  form,
  index,
}: {
  form: UseFormReturnType<ProductInput>;
  index: number;
}) {
  return (
    <Group mt="xs">
      <TextInput
        placeholder="Link Label (e.g. GitLab)"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`links.${index}.label`)}
        {...form.getInputProps(`links.${index}.label`)}
      />
      <TextInput
        placeholder="Link URL (e.g. https://www.gitlab.com)"
        withAsterisk
        leftSection={<IconLink />}
        style={{ flex: 2 }}
        key={form.key(`links.${index}.url`)}
        {...form.getInputProps(`links.${index}.url`)}
      />
      <ActionIcon
        color="red"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClick={() => form.removeListItem("links", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  );
}

export function ProductLinksInput({
  form,
}: {
  form: UseFormReturnType<ProductInput>;
}) {
  return (
    <Input.Wrapper
      label="Links"
      description="Add on links to the profile"
      key={`links`}
      {...form.getInputProps(`links`)}
    >
      {form.getValues().links.map((item, index) => (
        <LinkInput key={`links.${index}`} form={form} index={index} />
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("links", {
              id: 0,
              label: "",
              url: "",
            })
          }
        >
          Add Link
        </Button>
      </Group>
    </Input.Wrapper>
  );
}
