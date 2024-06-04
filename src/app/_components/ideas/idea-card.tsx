import {
  Stack,
  Text,
  Card,
  Group,
  ActionIcon,
  rem,
  Modal,
  Grid,
} from "@mantine/core";
import cardClasses from "~/styles/card.module.css";
import titleClasses from "~/styles/title.module.css";
import Link from "next/link";
import { navLinks } from "../shell";
import { IconArrowDown, IconArrowUp, IconPencil } from "@tabler/icons-react";
import { useAuth } from "@clerk/nextjs";
import { type Idea } from "~/server/api/routers/idea";
import { api } from "~/trpc/react";
import { useDisclosure } from "@mantine/hooks";
import { IdeaForm } from "./idea-form";

export function IdeaCard({ idea }: { idea: Idea }) {
  const [opened, { open, close }] = useDisclosure(false);
  const auth = useAuth();

  const upvotedIDs = idea.upvoted.map((user) => user.id);

  const utils = api.useUtils();
  const editIdeaMutation = api.idea.edit.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  const upvoteIdeaMutation = api.idea.upvote.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  const downvoteIdeaMutation = api.idea.downvote.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  return (
    <Card key={idea.id} className={cardClasses.staticCard} shadow="xs">
      <Grid>
        <Grid.Col span="content">
          <Stack h="100%" px="xl" align="center" justify="center" gap={0}>
            <ActionIcon
              variant={
                upvotedIDs.includes(auth.userId!) ? "variant" : "outline"
              }
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
        </Grid.Col>
        <Grid.Col span="auto">
          <Stack gap={0}>
            <Group>
              <Link href={`${navLinks.ideas?.link}/${idea.id}`}>
                <Text
                  className={titleClasses.hoverWhiteText}
                  size="xl"
                  fw={900}
                >
                  {idea.title}
                </Text>
              </Link>
              {auth.userId === idea.creator.clerkUserId && (
                <ActionIcon onClick={open} variant="subtle" color="gray">
                  <IconPencil
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
            </Group>
            <Text c="white" size="lg">
              {`by John Tan`}
            </Text>
            {idea.content.length > 0 && <Text c="white">{idea.content}</Text>}
          </Stack>
        </Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={close}>
        <Text
          c="white"
          size="xl"
          fz="h3"
          fw={900}
          className={titleClasses.titleUnderline}
          mb="md"
        >
          Edit Idea
        </Text>
        <IdeaForm
          initialValues={{
            title: idea.title,
            content: idea.content,
            creator: "",
          }}
          submitForm={(values) =>
            editIdeaMutation.mutate(
              {
                ...values,
                id: idea.id,
              },
              {
                onError: (error) => console.log(error),
              },
            )
          }
        />
      </Modal>
    </Card>
  );
}
