import {
  Stack,
  Title,
  Text,
  Space,
  Image,
  Group,
  Card,
  SimpleGrid,
  Timeline,
} from "@mantine/core";
import { CloudinaryImage } from "../cloudinary-image";
import { type Product } from "~/server/api/routers/product";
import classes from "~/styles/feature.module.css";
import { type Changelog, type Feature } from "@prisma/client";

export function ProductPage({ product }: { product: Product }) {
  const FeatureDisplay = ({ feature }: { feature: Feature }) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  );

  const ChangelogDisplay = ({ changelog }: { changelog: Changelog }) => (
    <>
      {changelog.changes.map((change, index) => (
        <Timeline.Item key={`${changelog.quarter}.${index}`}>
          <Text size="xl" fw="bolder">
            {changelog.quarter}
          </Text>
          <Text c="dimmed" size="sm">
            {change}
          </Text>
        </Timeline.Item>
      ))}
    </>
  );

  console.log(product.changelogs);

  return (
    <Stack>
      <Group>
        <Image
          w="10vw"
          h="10vw"
          fit="contain"
          src={product.logo.url}
          alt={`${product.name} Logo`}
        />
        <Title order={1}>{product.name}</Title>
      </Group>
      <Text>{product.summary}</Text>
      <CloudinaryImage image={product.cover} alt={"Cover"} />
      <Space h="md" />
      <Title order={2}>Key Features</Title>
      <SimpleGrid cols={3}>
        {product.features?.map((feature) => (
          <FeatureDisplay key={feature.title} feature={feature} />
        ))}
      </SimpleGrid>
      <Title order={2}>Highlights</Title>
      <Timeline bulletSize={25}>
        {product.changelogs.map((changelog) => (
          <ChangelogDisplay changelog={changelog} key={changelog.quarter} />
        ))}
        <Timeline.Item></Timeline.Item>
      </Timeline>
    </Stack>
  );
}
