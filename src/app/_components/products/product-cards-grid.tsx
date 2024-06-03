import { Text, SimpleGrid, Paper } from "@mantine/core";
import Link from "next/link";
import { navLinks } from "../shell";
import classes from "~/styles/cursor.module.css";
import { api } from "~/trpc/react";
import { CloudinaryImage } from "../cloudinary-image";

export function ProductCardsGrid() {
  const products = api.product.getAll.useQuery();

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
      <CloudinaryImage image={product.logo} alt={"Logo"} />
      <Text size="xl" fw="bold">
        {product.name}
      </Text>
    </Paper>
  ));

  return <SimpleGrid cols={3}>{cards}</SimpleGrid>;
}
