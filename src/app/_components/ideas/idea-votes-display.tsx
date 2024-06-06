import { Text, ActionIcon, Stack } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useAuth } from "@clerk/nextjs";
import { type Idea } from "~/server/api/routers/idea";
import { api } from "~/trpc/react";

export function IdeaVotesDisplay({ idea }: { idea: Idea }) {
  const auth = useAuth();

  const upvotedIDs = idea.upvoted.map((user) => user.id);
  const utils = api.useUtils();

  const upvoteIdeaMutation = api.idea.upvote.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
    },
  });

  const downvoteIdeaMutation = api.idea.downvote.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
    },
  });

  return (
    <Stack h="100%" px="xl" align="center" justify="center" gap={0}>
      <ActionIcon
        variant={upvotedIDs.includes(auth.userId!) ? "variant" : "outline"}
        aria-label="Settings"
        color="rgba(255, 255, 255, 1)"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        radius={100}
        onClick={() =>
          !upvotedIDs.includes(auth.userId!)
            ? upvoteIdeaMutation.mutate(
                {
                  id: idea.id,
                  users: [...upvotedIDs, auth.userId!],
                },
                {
                  onError: (error) => console.log(error),
                },
              )
            : downvoteIdeaMutation.mutate(
                {
                  id: idea.id,
                  users: [auth.userId!],
                },
                {
                  onError: (error) => console.log(error),
                },
              )
        }
      >
        <IconArrowUp />
      </ActionIcon>
      <Text c="white" size="xl" fz="h3" fw={300}>
        {idea.upvoted.length - idea.downvoted.length}
      </Text>
    </Stack>
  );
}
