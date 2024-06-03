import { Text, SimpleGrid, Paper, Image, Stack, Card } from "@mantine/core";
import Link from "next/link";
import { navLinks } from "../shell";
import classes from "~/styles/cursor.module.css";
import cardClasses from "~/styles/card.module.css";
import { api } from "~/trpc/react";

export function ProductCardsGrid() {
  const products = api.product.getAll.useQuery();

  if (!products.data) {
    return <div>Loading...</div>;
  }

  const cards = products.data.map((product) => (
    <Card
      component={Link}
      href={`${navLinks.products?.link}/${product.id}`}
      key={product.id}
      className={classes.hover && cardClasses.card}
      shadow="xs"
      p="xl"
    >
      <Stack align="center" justify="center">
        <Image
          w="50%"
          h="auto"
          fit="contain"
          src={product.logo.url}
          alt={`${product.name} Logo`}
        />
        <Text size="xl" fw="bold">
          {product.name}
        </Text>
      </Stack>
    </Card>
  ));

  return <SimpleGrid cols={3}>{cards}</SimpleGrid>;
}
