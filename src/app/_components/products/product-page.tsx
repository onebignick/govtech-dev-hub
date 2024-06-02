import { Stack, Title, Text, Space } from "@mantine/core";
import { type Product } from "~/server/api/routers/product";

export function ProductPage({ product }: { product: Product }) {
  return (
    <Stack>
      <Title order={1}>{product.name}</Title>
      <Text>{product.summary}</Text>
      <Space h="md" />
      <Title order={2}>Key Features</Title>
      {product.features?.map((feature) => (
        <Text
          key={feature.title}
        >{`${feature.title} - ${feature.description}`}</Text>
      ))}
    </Stack>
  );
}
