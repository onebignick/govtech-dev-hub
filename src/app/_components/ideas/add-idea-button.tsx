"use client";

import classes from "~/styles/title.module.css";
import { Button, Modal, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/trpc/react";
import { IdeaForm } from "./idea-form";
import { useAuth } from "@clerk/nextjs";

export default function AddIdeaButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const auth = useAuth();

  const utils = api.useUtils();
  const createProductMutation = api.idea.create.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  return (
    <>
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
          close={close}
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
      <Button
        onClick={open}
        leftSection={<IconPlus />}
        variant="gradient"
        gradient={{ from: "indigo", to: "violet", deg: 90 }}
      >
        Create
      </Button>
    </>
  );
}
