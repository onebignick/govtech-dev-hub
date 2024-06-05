import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Input,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type CategoriesInput } from "~/server/api/routers/category";
import { CategoryItemsInput } from "./category-items-input";
import { type Product } from "@prisma/client";

function CategoryInput({
  form,
  index,
  products,
}: {
  form: UseFormReturnType<CategoriesInput>;
  index: number;
  products: Product[];
}) {
  return (
    <Fieldset mt="xs" key={`categories.${index}`} legend="Category">
      <Stack>
        <TextInput
          label="Category Name"
          withAsterisk
          style={{ flex: 1 }}
          key={form.key(`categories.${index}.name`)}
          {...form.getInputProps(`categories.${index}.name`)}
        />
        <Textarea
          label="Description"
          placeholder="(Optional)"
          key={form.key(`categories.${index}.description`)}
          {...form.getInputProps(`categories.${index}.description`)}
        />
        <CategoryItemsInput
          products={products}
          form={form}
          categoryIndex={index}
        />
        {form
          .getValues()
          .categories[
            index
          ]?.children.map((item, subCategoryIndex) => <ProductSubCategoryInput key={`categories.${index}.children.${subCategoryIndex}`} form={form} categoryIndex={index} subCategoryIndex={subCategoryIndex} products={products} />)}
        <Stack w="100%" justify="center" align="center">
          <Button
            variant="light"
            onClick={() =>
              form.insertListItem(`categories.${index}.children`, {
                name: "",
                description: "",
                items: [],
              })
            }
          >
            Add Sub-Category
          </Button>
        </Stack>
        <ActionIcon
          color="red"
          onClick={() => form.removeListItem("categories", index)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Stack>
    </Fieldset>
  );
}

export function ProductSubCategoryInput({
  form,
  categoryIndex,
  subCategoryIndex,
  products,
}: {
  form: UseFormReturnType<CategoriesInput>;
  products: Product[];
  categoryIndex: number;
  subCategoryIndex: number;
}) {
  return (
    <Fieldset
      mt="xs"
      key={form.key(`categories.${categoryIndex}.children.${subCategoryIndex}`)}
      {...form.getInputProps(
        `categories.${categoryIndex}.children.${subCategoryIndex}`,
      )}
    >
      <Stack>
        <TextInput
          label="Category Name"
          withAsterisk
          style={{ flex: 1 }}
          key={form.key(
            `categories.${categoryIndex}.children.${subCategoryIndex}.name`,
          )}
          {...form.getInputProps(
            `categories.${categoryIndex}.children.${subCategoryIndex}.name`,
          )}
        />
        <Textarea
          label="Description"
          placeholder="(Optional)"
          key={form.key(
            `categories.${categoryIndex}.children.${subCategoryIndex}.description`,
          )}
          {...form.getInputProps(
            `categories.${categoryIndex}.children.${subCategoryIndex}.description`,
          )}
        />
        <CategoryItemsInput
          products={products}
          form={form}
          categoryIndex={categoryIndex}
          subCategoryIndex={subCategoryIndex}
        />
        <ActionIcon
          color="red"
          onClick={() =>
            form.removeListItem(
              `categories.${categoryIndex}.children`,
              subCategoryIndex,
            )
          }
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Stack>
    </Fieldset>
  );
}

export function ProductCategoriesInput({
  form,
  products,
}: {
  form: UseFormReturnType<CategoriesInput>;
  products: Product[];
}) {
  return (
    <Input.Wrapper
      key={form.key("categories")}
      {...form.getInputProps(`categories`)}
    >
      {form.getValues().categories.map((item, index) => (
        <CategoryInput
          products={products}
          key={`categories.${index}`}
          form={form}
          index={index}
        />
      ))}
      <Group justify="center" mt="md">
        <Button
          variant="light"
          onClick={() =>
            form.insertListItem("categories", {
              name: "",
              description: "",
              items: [],
              children: [],
            })
          }
        >
          Add Category
        </Button>
      </Group>
    </Input.Wrapper>
  );
}
