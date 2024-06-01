import { Text, Paper, Group, Avatar, Stack } from "@mantine/core";
import { type UserResource } from "@clerk/types";

export function UserSummaryCard({ user }: { user: UserResource }) {
  return (
    <Paper shadow="xs" p="xl">
      <Group align="center">
        <Avatar src={user.imageUrl} />
        <Stack gap="xs">
          <Text size="xl" fw="bold">
            {user.username}
          </Text>
          <Text>{user.primaryEmailAddress?.emailAddress}</Text>
        </Stack>
      </Group>
    </Paper>
  );
}
