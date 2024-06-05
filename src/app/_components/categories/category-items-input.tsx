import {
  ActionIcon,
  Button,
  Group,
  Input,
  NativeSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { type Product } from "@prisma/client";
import { IconTrash } from "@tabler/icons-react";
import { type CategoriesInput } from "~/server/api/routers/category";

function CategoryItemInput({
  form,
  categoryIndex,
  subCategoryIndex = null,
  itemIndex,
  products,
}: {
  form: UseFormReturnType<CategoriesInput>;
  categoryIndex: number;
  subCategoryIndex?: number | null;
  itemIndex: number;
  products: Product[];
}) {
  const rootPath = `categories.${categoryIndex}${subCategoryIndex !== null ? `.children.${subCategoryIndex}` : ""}.items`;

  return (
    <Group mt="xs">
      <TextInput
        placeholder="e.g. host my code on Git"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`${rootPath}.${itemIndex}.label`)}
        {...form.getInputProps(`${rootPath}.${itemIndex}.label`)}
      />
      <NativeSelect
        withAsterisk
        key={form.key(`${rootPath}.${itemIndex}.product`)}
        data={[
          { label: "", value: "" },
          ...products.map((product) => ({
            label: product.name,
            value: product.id,
          })),
        ]}
        {...form.getInputProps(`${rootPath}.${itemIndex}.product`)}
      />
      <ActionIcon
        color="red"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClick={() => form.removeListItem(rootPath, itemIndex)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  );
}

export function CategoryItemsInput({
  form,
  categoryIndex,
  subCategoryIndex = null,
  products,
}: {
  form: UseFormReturnType<CategoriesInput>;
  categoryIndex: number;
  subCategoryIndex?: number | null;
  products: Product[];
}) {
  const items =
    (subCategoryIndex !== null
      ? form.getValues().categories[categoryIndex]?.children[subCategoryIndex]
          ?.items
      : form.getValues().categories[categoryIndex]?.items) ?? [];
  const rootPath = `categories.${categoryIndex}${subCategoryIndex !== null ? `.children.${subCategoryIndex}` : ""}.items`;

  return (
    <Input.Wrapper
      label={items.length > 0 ? "Items" : undefined}
      key={form.key(rootPath)}
      {...form.getInputProps(rootPath)}
    >
      {items.length > 0 && (
        <Text c="white" size="h3">
          I want to
        </Text>
      )}
      {items.map((item, itemIndex) => (
        <CategoryItemInput
          products={products}
          key={`${rootPath}.${itemIndex}`}
          form={form}
          categoryIndex={categoryIndex}
          subCategoryIndex={subCategoryIndex}
          itemIndex={itemIndex}
        />
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem(rootPath, {
              label: "",
              product: "",
            })
          }
        >
          Add Item
        </Button>
      </Group>
    </Input.Wrapper>
  );
}
