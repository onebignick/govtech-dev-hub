import { Stack, Text, Card, Group, Grid, Badge } from "@mantine/core";
import cardClasses from "~/styles/card.module.css";
import titleClasses from "~/styles/title.module.css";
import { useAuth } from "@clerk/nextjs";
import { type Idea } from "~/server/api/routers/idea";
import { DateTime } from "luxon";
import { UserDisplay } from "../userDisplay";
import { EditIdeaButton } from "./edit-idea-button";
import { IdeaVotesDisplay } from "./idea-votes-display";
import { DateBadge } from "../date-badge";

export function IdeaCard({ idea }: { idea: Idea }) {
  const auth = useAuth();

  return (
    <Card key={idea.id} className={cardClasses.staticCard} shadow="xs">
      <Grid>
        <Grid.Col span="content">
          <IdeaVotesDisplay idea={idea} />
        </Grid.Col>
        <Grid.Col span="auto">
          <Stack gap={0}>
            <Group>
              <Text className={titleClasses.hoverWhiteText} size="xl" fw={900}>
                {idea.title}
              </Text>
              {auth.userId === idea.creator.id && (
                <EditIdeaButton idea={idea} />
              )}
            </Group>
            <Group>
              <UserDisplay userID={idea.creatorID} />
              <DateBadge date={idea.createdAt} format={DateTime.DATE_MED} />
            </Group>
            {idea.content.length > 0 && <Text c="white">{idea.content}</Text>}
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
