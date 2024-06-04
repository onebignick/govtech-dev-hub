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
import { type Product } from "~/server/api/routers/product";
import cardClasses from "~/styles/card.module.css";
import titleClasses from "~/styles/title.module.css";
import { type Changelog, type Feature } from "@prisma/client";

export function ProductPage({ product }: { product: Product }) {
  const FeatureDisplay = ({ feature }: { feature: Feature }) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={cardClasses.staticCard}
      padding="xl"
    >
      <Stack align="flex-start">
        <Text
          fz="lg"
          fw={900}
          c="white"
          className={titleClasses.titleUnderline}
        >
          {feature.title}
        </Text>
        <Text c="white" fz="md" mt="md">
          {feature.description}
        </Text>
      </Stack>
    </Card>
  );

  const ChangelogDisplay = ({ changelog }: { changelog: Changelog }) => (
    <>
      {changelog.changes.map((change, index) => (
        <Stack key={`${changelog.quarter}.${index}`}>
          <Text size="xl" fw="bolder">
            {changelog.quarter}
          </Text>
          <Text c="dimmed" size="sm">
            {change}
          </Text>
        </Stack>
      ))}
    </>
  );

  return (
    <Stack align="flex-start">
      <Group>
        <Image
          w="10vw"
          h="10vw"
          fit="contain"
          src={product.logo.url}
          alt={`${product.name} Logo`}
        />
        <Stack gap={0}>
          <Text>{product.oneLiner}</Text>
          <Title c="white" order={1} className={titleClasses.titleUnderline}>
            {product.name}
          </Title>
        </Stack>
      </Group>
      <Text size="lg" fw="500">
        {product.summary}
      </Text>
      <Image src={product.cover?.url} alt={`${product.name} Cover`} />
      <Space h="md" />
      <Title order={2} c="white">
        Key Features
      </Title>
      <SimpleGrid w="100%" cols={3}>
        {product.features?.map((feature) => (
          <FeatureDisplay key={feature.title} feature={feature} />
        ))}
      </SimpleGrid>
      <Title order={2} c="white">
        Highlights
      </Title>
      <Timeline
        color="violet"
        active={product.changelogs.length + 1}
        bulletSize={25}
        mb="xl"
      >
        {product.changelogs.map((changelog) => (
          <Timeline.Item key={changelog.quarter}>
            <ChangelogDisplay changelog={changelog} />
          </Timeline.Item>
        ))}
        <Timeline.Item></Timeline.Item>
      </Timeline>
    </Stack>
  );
}
