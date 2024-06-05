import { Text, Stack, Card } from "@mantine/core";
import Link from "next/link";
import classes from "~/styles/cursor.module.css";
import cardClasses from "~/styles/card.module.css";
import titleClasses from "~/styles/title.module.css";
import { type Contact } from "@prisma/client";
import { IconMail } from "@tabler/icons-react";

export function ProductContactCard({ contact }: { contact: Contact }) {
  return (
    <Card
      component={Link}
      href={`mailto:${contact.email}`}
      key={contact.id}
      className={classes.hover && cardClasses.card}
      shadow="xs"
      p="xl"
    >
      <Stack align="flex-start">
        <IconMail size="3em" color="white" />
        <Text
          size="xl"
          fw={900}
          c="white"
          className={titleClasses.titleUnderline}
        >
          {contact.name}
        </Text>
        <Text ta="center" c="white" lineClamp={3}>
          {contact.email}
        </Text>
      </Stack>
    </Card>
  );
}
