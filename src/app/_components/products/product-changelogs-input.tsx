import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Input,
  NativeSelect,
  Stack,
  TextInput,
} from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconArrowDown, IconArrowUp, IconTrash } from "@tabler/icons-react";
import { type ProductInput } from "~/server/api/routers/product";

function ChangeInput({
  form,
  changelogIndex,
  changeIndex,
}: {
  form: UseFormReturnType<ProductInput>;
  changelogIndex: number;
  changeIndex: number;
}) {
  return (
    <Group mt="xs">
      <TextInput
        placeholder="e.g. Added Singpass Login"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`changelogs.${changelogIndex}.changes.${changeIndex}`)}
        {...form.getInputProps(
          `changelogs.${changelogIndex}.changes.${changeIndex}`,
        )}
      />
      <ActionIcon
        color="red"
        onClick={() =>
          form.removeListItem(
            `changelogs.${changelogIndex}.changes`,
            changeIndex,
          )
        }
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  );
}

export function ProductChangelogsInput({
  form,
}: {
  form: UseFormReturnType<ProductInput>;
}) {
  const fromYear = 2023;
  const currentYear = new Date().getFullYear();
  const quarterOptions: string[] = [];

  for (let i = currentYear; i > fromYear; i -= 1) {
    quarterOptions.push(...[`${i} Q1`, `${i} Q2`, `${i} Q3`, `${i} Q4`]);
  }

  return (
    <Input.Wrapper
      label="Changelogs"
      description="List down your changelogs"
      key={`changelogs`}
      {...form.getInputProps(`changelogs`)}
    >
      {(form.getValues().changelogs ?? []).map((item, changelogIndex) => (
        <Fieldset
          mt="xs"
          key={`changelogs.${changelogIndex}`}
          legend="Quarterly Changelog"
        >
          <Group>
            <NativeSelect
              withAsterisk
              key={form.key(`changelogs.${changelogIndex}.quarter`)}
              data={quarterOptions}
              {...form.getInputProps(`changelogs.${changelogIndex}.quarter`)}
            />
            <ActionIcon
              color="red"
              onClick={() => form.removeListItem("changelogs", changelogIndex)}
            >
              <IconTrash size="1rem" />
            </ActionIcon>
            {changelogIndex > 0 && (
              <ActionIcon
                variant="light"
                onClick={() =>
                  form.reorderListItem(`changelogs`, {
                    from: changelogIndex,
                    to: changelogIndex - 1,
                  })
                }
              >
                <IconArrowUp size="1rem" />
              </ActionIcon>
            )}
            {changelogIndex <
              (form.getValues().changelogs ?? []).length - 1 && (
              <ActionIcon
                variant="light"
                onClick={() =>
                  form.reorderListItem(`changelogs`, {
                    from: changelogIndex,
                    to: changelogIndex + 1,
                  })
                }
              >
                <IconArrowDown size="1rem" />
              </ActionIcon>
            )}
          </Group>
          <Stack my="sm" gap={2}>
            {(item.changes ?? []).map((item, changeIndex) => (
              <ChangeInput
                key={`changelogs.${changelogIndex}.changes.${changeIndex}`}
                form={form}
                changelogIndex={changelogIndex}
                changeIndex={changeIndex}
              />
            ))}
          </Stack>
          <Group justify="center" mt="md">
            <Button
              variant="outline"
              onClick={() =>
                form.insertListItem(`changelogs.${changelogIndex}.changes`, "")
              }
            >
              Add Change
            </Button>
          </Group>
        </Fieldset>
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("changelogs", {
              quarter: "",
              changes: [""],
            })
          }
        >
          Add Quarter
        </Button>
      </Group>
    </Input.Wrapper>
  );
}
