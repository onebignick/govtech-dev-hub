"use client";

import { Stack, Menu, Button } from "@mantine/core";
import { IdeaCard } from "./idea-card";
import { useEffect, useState } from "react";
import { IconClock, IconThumbUp } from "@tabler/icons-react";
import { type Idea } from "~/server/api/routers/idea";

enum SortOrder {
  recent,
  votes,
}

export function IdeasList({ ideas }: { ideas: Idea[] }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.votes);
  const [ideasDisplayed, setIdeas] = useState<Idea[]>(ideas);

  useEffect(() => {
    if (sortOrder === SortOrder.recent) {
      setIdeas([...ideas].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0)));
    } else if (sortOrder === SortOrder.votes) {
      setIdeas([...ideas].sort((a, b) => b._count.upvoted - a._count.upvoted));
    }
  }, [ideas, sortOrder]);

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
        {ideasDisplayed.map((idea) => (
          <IdeaCard idea={idea} key={idea.id} />
        ))}
      </Stack>
    </Stack>
  );
}
