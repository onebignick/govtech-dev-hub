import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { api } from "~/trpc/react";

const typeColors: Record<string, string> = {
  user: "blue",
  admin: "cyan",
  superadmin: "pink",
};

export function UsersTable() {
  const users = api.user.get.useQuery();

  if (!users.data) {
    return <div>Loading...</div>;
  }

  const rows = users.data.map((user) => (
    <Table.Tr key={user.email}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius={30} />
          <Text fz="sm" fw={500}>
            {user.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={typeColors[user.type.toLowerCase()]} variant="light">
          {user.type}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm"></Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
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
            <Table.Th>Employee</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
