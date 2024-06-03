import { Stack, Title, Text, Space } from "@mantine/core";
import { CloudinaryImage } from "../cloudinary-image";
import { type Product } from "~/server/api/routers/product";

export function ProductPage({ product }: { product: Product }) {
  return (
    <Stack>
      <CloudinaryImage image={product.logo} alt={"Logo"} />
      <Title order={1}>{product.name}</Title>
      <Text>{product.summary}</Text>
      <CloudinaryImage image={product.cover} alt={"Cover"} />
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
