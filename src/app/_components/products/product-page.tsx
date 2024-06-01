import { Stack, Title, Text } from "@mantine/core";
import { type Product } from "~/server/db/schema";

export function ProductPage({ product }: { product: Product }) {
  console.log(product);

  return (
    <Stack>
      <Title order={1}>{product.name}</Title>
      <Text>{product.summary}</Text>
      <Title order={2}>Key Features</Title>
      {product.keyfeatures?.map((feature) => (
        <Text
          key={feature.title}
        >{`${feature.title} - ${feature.description}`}</Text>
      ))}
    </Stack>
  );
}
