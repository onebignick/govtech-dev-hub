"use client";

import { Avatar, Group, Popover, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/trpc/react";

export function UserDisplay({ userID }: { userID: string }) {
  const [opened, { close, open }] = useDisclosure(false);
  const userRes = api.user.getClerkUser.useQuery(userID);

  if (userRes.error) {
    console.log(userRes.error);
  }

  if (!userRes.data) {
    return null;
  }

  const user = userRes.data;

  return (
    <Group>
      <Avatar src={user.imageUrl} size="sm" />
      <Stack gap={0}>
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
        >
          <Popover.Target>
            <Text
              onMouseEnter={open}
              onMouseLeave={close}
              c="white"
              fw={900}
              size="lg"
            >
              {user.username}
            </Text>
          </Popover.Target>
          <Popover.Dropdown style={{ pointerEvents: "none" }}>
            <Text size="sm">{user.emailAddresses[0]?.emailAddress}</Text>
          </Popover.Dropdown>
        </Popover>
      </Stack>
    </Group>
  );
}
