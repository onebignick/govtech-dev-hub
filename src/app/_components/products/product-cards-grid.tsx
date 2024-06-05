import { Text, SimpleGrid, Image, Stack, Card } from "@mantine/core";
import Link from "next/link";
import { navLinks } from "../shell";
import classes from "~/styles/cursor.module.css";
import cardClasses from "~/styles/card.module.css";
import titleClasses from "~/styles/title.module.css";
import { type ProductSummary } from "~/server/api/routers/product";

export function ProductCardsGrid({ products }: { products: ProductSummary[] }) {
  const cards = products.map((product) => (
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
        <Text
          size="xl"
          fw={900}
          c="white"
          className={titleClasses.titleUnderline}
        >
          {product.name}
        </Text>
        <Text ta="center" c="white" lineClamp={3}>
          {product.oneLiner}
        </Text>
      </Stack>
    </Card>
  ));

  return <SimpleGrid cols={{ base: 2, sm: 3 }}>{cards}</SimpleGrid>;
}
