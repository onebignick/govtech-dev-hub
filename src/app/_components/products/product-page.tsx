import { Stack, Title } from "@mantine/core";
import { type Product } from "~/server/db/schema";
import { MarkdownDisplay } from "../markdown";

export function ProductPage({ product }: { product: Product }) {
  console.log(product.content);
  return (
    <Stack>
      <Title order={1}>{product.name}</Title>
      <MarkdownDisplay markdown={product.content} />
    </Stack>
  );
}
