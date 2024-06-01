import { Text, SimpleGrid, Paper } from "@mantine/core";
import Link from "next/link";
import { api } from "~/trpc/react";
import { navLinks } from "../shell";
import classes from "@css/cursor.module.css";

export function ProductCardsGrid() {
  const products = api.product.get.useQuery();

  if (!products.data) {
    return <div>Loading...</div>;
  }

  const cards = products.data.map((product) => (
    <Paper
      component={Link}
      href={`${navLinks.products?.link}/${product.id}`}
      key={product.id}
      className={classes.hover}
      shadow="xs"
      p="xl"
    >
      <Text size="xl" fw="bold">
        {product.name}
      </Text>
      <Text>{product.summary}</Text>
    </Paper>
  ));

  return <SimpleGrid cols={3}>{cards}</SimpleGrid>;
}
