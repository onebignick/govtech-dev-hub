"use client";

import classes from "~/styles/title.module.css";
import { Button, Modal, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/trpc/react";
import { OrganisationForm } from "./organisation-form";

export default function AddOrganisationButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const utils = api.useUtils();
  const createOrganisationMutation = api.organisation.create.useMutation({
    onSuccess() {
      utils.organisation.invalidate().catch((error) => console.log(error));
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
          Create New Organisation
        </Text>
        <OrganisationForm
          submitForm={(values) => {
            createOrganisationMutation.mutate(
              {
                ...values,
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
