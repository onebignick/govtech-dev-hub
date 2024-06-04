import { Stack, Text, Space } from "@mantine/core";
import { type Idea } from "@prisma/client";
import { api } from "~/trpc/react";
import { IdeaCard } from "./idea-card";

export function IdeasList() {
  const ideasRes = api.idea.getAll.useQuery();

  if (!ideasRes.data) {
    return <div>Loading...</div>;
  }

  const ideas = ideasRes.data;

  return (
    <Stack>
      {ideas.map((idea) => (
        <IdeaCard idea={idea} key={idea.id} />
      ))}
    </Stack>
  );
}
