"use client";

import classes from "~/styles/title.module.css";
import Shell from "@frontend/_components/shell";
import { Button, Group, Modal, Stack, Title, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { IdeasList } from "../_components/ideas/ideas-list";
import { useDisclosure } from "@mantine/hooks";
import { IdeaForm } from "../_components/ideas/idea-form";
import { api } from "~/trpc/react";
import { useAuth } from "@clerk/nextjs";

export default function Ideas() {
  const [opened, { open, close }] = useDisclosure(false);
  const auth = useAuth();

  const utils = api.useUtils();
  const createProductMutation = api.idea.create.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
    },
  });

  return (
    <Shell
      page={
        <Stack>
          <Modal opened={opened} onClose={close}>
            <Text
              c="white"
              size="xl"
              fz="h3"
              fw={900}
              className={classes.titleUnderline}
              mb="md"
            >
              Submit New Idea
            </Text>
            <IdeaForm
              submitForm={(values) => {
                createProductMutation.mutate(
                  {
                    ...values,
                    creator: auth.userId!,
                  },
                  {
                    onError: (error) => console.log(error),
                  },
                );
              }}
            />
          </Modal>
          <Group justify="space-between" mb="md">
            <Title order={1} c="white" className={classes.titleUnderline}>
              Ideas Exchange
            </Title>
            <Button
              onClick={open}
              leftSection={<IconPlus />}
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Create
            </Button>
          </Group>
          <IdeasList />
        </Stack>
      }
    />
  );
}
