"use client";

import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  Stack,
  Title,
  Badge,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { type Product } from "@prisma/client";
import Shell, { navLinks } from "../shell";
import titleClasses from "~/styles/title.module.css";

const typeColors: Record<string, string> = {
  PRODUCT: "blue",
  AGENCY: "cyan",
  DEVTOOLS: "red",
  INNERSOURCE: "pink",
  PROTOTYPE: "purple",
};

export function ProductsTable({ products }: { products: Product[] }) {
  const utils = api.useUtils();
  const deleteUserMutation = api.product.delete.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  const deleteProduct = (id: string) => {
    deleteUserMutation.mutate({ id });
    utils.product.invalidate().catch((error) => console.log(error));
  };

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>
        <Text fz="sm">{product.id}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm" fw={500}>
          {product.name}
        </Text>
      </Table.Td>

      <Table.Td>
        <Badge color={typeColors[product.type.toLowerCase()]} variant="light">
          {product.type}
        </Badge>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/products/${product.id}/edit/`}
          >
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => deleteProduct(product.id)}
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Title order={1} c="white" className={titleClasses.titleUnderline}>
            Product Management
          </Title>
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Organisation</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Stack>
      }
    />
  );
}
