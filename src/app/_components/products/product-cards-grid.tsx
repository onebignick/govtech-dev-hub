import { Text, SimpleGrid, Paper } from "@mantine/core";
import { api } from "~/trpc/react";

export function ProductCardsGrid() {
  const products = api.product.get.useQuery();

  if (!products.data) {
    return <div>Loading...</div>;
  }

  const cards = products.data.map((product) => (
    <Paper key={product.id} shadow="xs" p="xl">
      <Text size="xl" fw="bold">
        {product.name}
      </Text>
      <Text>{product.summary}</Text>
    </Paper>
  ));

  return <SimpleGrid cols={3}>{cards}</SimpleGrid>;
}
