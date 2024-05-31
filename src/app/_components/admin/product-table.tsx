import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { api } from "~/trpc/react";

const typeColors: Record<string, string> = {
  product: "blue",
  agencyproject: "cyan",
  innersource: "orange",
};

export function ProductsTable() {
  const utils = api.useUtils();
  const products = api.product.get.useQuery();
  const deleteUserMutation = api.product.delete.useMutation({
    onSuccess() {
      utils.user.invalidate().catch((error) => console.log(error));
    },
  });

  const deleteProduct = (id: number) => {
    deleteUserMutation.mutate({ id });
    products.refetch().catch((error) => console.log(error));
  };

  if (!products.data) {
    return <div>Loading...</div>;
  }

  const rows = products.data.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius={30} />
          <Text fz="sm" fw={500}>
            {product.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={typeColors[product.type.toLowerCase()]} variant="light">
          {product.type}
        </Badge>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Text fz="sm"></Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            component={Link}
            href={`/admin/products/edit/${product.id}`}
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
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
