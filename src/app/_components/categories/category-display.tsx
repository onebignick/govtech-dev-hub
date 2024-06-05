import {
  Group,
  Card,
  Text,
  Stack,
  Title,
  Avatar,
  Divider,
} from "@mantine/core";
import { api } from "~/trpc/react";
import cardClasses from "~/styles/card.module.css";
import {
  type ProductCategory,
  type ProductCategoryItem,
} from "~/server/api/routers/category";
import Link from "next/link";
import { navLinks } from "../shell";
import { LoaderDisplay } from "../loader";

function ProductListItem({ item }: { item: ProductCategoryItem }) {
  return (
    <Card
      component={Link}
      href={`${navLinks.products?.link}/${item.productId}`}
      shadow="xs"
      className={cardClasses.card}
      my="sm"
    >
      <Group justify="space-between" px="xl">
        <Text size="h3" c="white" fw={800}>
          {item.label}
        </Text>
        <Group>
          <Avatar src={item.product.logo.url} />
          <Text size="md" c="white">
            {item.product.name}
          </Text>
        </Group>
      </Group>
    </Card>
  );
}

function ProductCategoryDisplay({ category }: { category: ProductCategory }) {
  return (
    <Stack gap={0}>
      <Title c="white" order={2} lh={1} mb={0}>
        {category.name}
      </Title>
      {category.description && category.description?.length > 0 && (
        <Text>{category.description}</Text>
      )}
      {category.items.length > 0 && category.statement && (
        <Text c="white" size="xl">
          {category.statement}
        </Text>
      )}
      {category.items.map((item) => (
        <ProductListItem item={item} key={item.id} />
      ))}
      {category.children.map((subCategory) => (
        <Stack key={subCategory.id} ml="xl" mt="md" gap={0}>
          <Title c="white" order={3} lh={1}>
            {subCategory.name}
          </Title>
          {subCategory.description && subCategory.description?.length > 0 && (
            <Text>{subCategory.description}</Text>
          )}
          {subCategory.items.length > 0 && subCategory.statement && (
            <Text c="white" size="xl">
              {subCategory.statement}
            </Text>
          )}
          {subCategory.items.map((item) => (
            <ProductListItem item={item} key={item.id} />
          ))}
        </Stack>
      ))}
      <Divider color="white" my="md" />
    </Stack>
  );
}

export function CategoryDisplay() {
  const categoryRes = api.category.getAll.useQuery();

  if (!categoryRes.data) {
    return <LoaderDisplay />;
  }

  const categories = categoryRes.data;

  return (
    <Stack>
      {categories.map((category) => (
        <ProductCategoryDisplay category={category} key={category.id} />
      ))}
    </Stack>
  );
}
