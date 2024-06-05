import { Stack, Text, Space, Menu, Button } from "@mantine/core";
import { api } from "~/trpc/react";
import { IdeaCard } from "./idea-card";
import { useEffect, useState } from "react";
import { IconClock, IconThumbUp } from "@tabler/icons-react";
import { type Idea } from "~/server/api/routers/idea";

enum SortOrder {
  recent,
  votes,
}

export function IdeasList() {
  const ideasRes = api.idea.getAll.useQuery();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.votes);
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    if (!ideasRes.data) {
      return;
    }

    if (sortOrder === SortOrder.recent) {
      setIdeas(
        [...ideasRes.data].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0)),
      );
    } else if (sortOrder === SortOrder.votes) {
      setIdeas(
        [...ideasRes.data].sort((a, b) => b._count.upvoted - a._count.upvoted),
      );
    }
  }, [ideasRes.data, sortOrder]);

  if (!ideasRes.data) {
    return <div>Loading...</div>;
  }

  return (
    <Stack align="flex-start">
      <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 90 }}
          >
            {`Sorted by: ${sortOrder === SortOrder.recent ? "Most Recent" : "Highest Voted"}`}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconClock />}
            onClick={() => setSortOrder(SortOrder.recent)}
          >
            Most Recent
          </Menu.Item>
          <Menu.Item
            leftSection={<IconThumbUp />}
            onClick={() => setSortOrder(SortOrder.votes)}
          >
            Highest Voted
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Stack w="100%">
        {ideas.map((idea) => (
          <IdeaCard idea={idea} key={idea.id} />
        ))}
      </Stack>
    </Stack>
  );
}
