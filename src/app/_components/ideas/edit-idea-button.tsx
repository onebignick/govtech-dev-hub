import { Text, ActionIcon, rem, Modal } from "@mantine/core";
import titleClasses from "~/styles/title.module.css";
import { IconPencil } from "@tabler/icons-react";
import { useAuth } from "@clerk/nextjs";
import { type Idea } from "~/server/api/routers/idea";
import { api } from "~/trpc/react";
import { useDisclosure } from "@mantine/hooks";
import { IdeaForm } from "./idea-form";

export function EditIdeaButton({ idea }: { idea: Idea }) {
  const [opened, { open, close }] = useDisclosure(false);
  const auth = useAuth();

  const utils = api.useUtils();
  const editIdeaMutation = api.idea.edit.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  const deleteIdeaMutation = api.idea.delete.useMutation({
    onSuccess() {
      utils.idea.invalidate().catch((error) => console.log(error));
      close();
    },
  });

  return (
    <>
      {auth.userId === idea.creator.id && (
        <ActionIcon onClick={open} variant="subtle" color="gray">
          <IconPencil
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
      )}

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
          close={close}
          handleDelete={() => {
            deleteIdeaMutation.mutate(idea.id);
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
    </>
  );
}
