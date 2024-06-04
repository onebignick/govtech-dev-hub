import { ActionIcon, Button, Group, Input, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconLink, IconTrash } from "@tabler/icons-react";
import { type ProductInput } from "~/server/api/routers/product";

function ContactInput({
  form,
  index,
}: {
  form: UseFormReturnType<ProductInput>;
  index: number;
}) {
  return (
    <Group mt="xs">
      <TextInput
        placeholder="Name (e.g. Jason Tan)"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`contacts.${index}.name`)}
        {...form.getInputProps(`contacts.${index}.name`)}
      />
      <TextInput
        placeholder="Email (e.g. jason_tan@tech.gov.sg)"
        withAsterisk
        leftSection={<IconLink />}
        style={{ flex: 2 }}
        key={form.key(`contacts.${index}.email`)}
        {...form.getInputProps(`contacts.${index}.email`)}
      />
      <ActionIcon
        color="red"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClick={() => form.removeListItem("contacts", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  );
}

export function ProductContactsInput({
  form,
}: {
  form: UseFormReturnType<ProductInput>;
}) {
  return (
    <Input.Wrapper
      label="Contacts"
      description="Add contact points"
      key={`contacts`}
      {...form.getInputProps(`contacts`)}
    >
      {form.getValues().contacts.map((item, index) => (
        <ContactInput key={`contacts.${index}`} form={form} index={index} />
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("contacts", {
              id: 0,
              name: "",
              email: "",
            })
          }
        >
          Add Contact
        </Button>
      </Group>
    </Input.Wrapper>
  );
}
