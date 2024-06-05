"use client";

import classes from "~/styles/title.module.css";
import { ActionIcon, Modal, Text, rem } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { api } from "~/trpc/react";
import { OrganisationForm } from "./organisation-form";
import { type Organisation } from "~/server/api/routers/organisation";

export default function EditOrganisationButton({
  organisation,
}: {
  organisation: Organisation;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const utils = api.useUtils();
  const editOrganisationMutation = api.organisation.edit.useMutation({
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
          Edit Organisation
        </Text>
        <OrganisationForm
          initialValues={organisation}
          submitForm={(values) => {
            editOrganisationMutation.mutate(
              {
                ...values,
                id: organisation.id,
              },
              {
                onError: (error) => console.log(error),
              },
            );
          }}
        />
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="gray">
        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
    </>
  );
}
