"use client";

import { Group, Card, Text, Stack, Title } from "@mantine/core";
import titleClasses from "~/styles/title.module.css";
import cardClasses from "~/styles/card.module.css";
import { type Organisation } from "~/server/api/routers/organisation";
import AddOrganisationButton from "../organisations/add-organisation-button";
import Shell, { navLinks } from "../shell";
import EditOrganisationButton from "../organisations/edit-organisation-button";

export function OrganisationTree({
  organisations,
}: {
  organisations: Organisation[];
}) {
  function OrganisationCard({
    organisation,
    isChild = false,
  }: {
    organisation: Organisation;
    isChild?: boolean;
  }) {
    return (
      <Card
        key={organisation.id}
        shadow="xs"
        className={cardClasses.staticCard}
        my="sm"
        ml={isChild ? "xl" : undefined}
      >
        <Group>
          <Text size={isChild ? "h3" : "h2"} c="white" fw={900}>
            {organisation.acronym}
          </Text>
          <Text size={isChild ? "md" : "lg"} c="white">
            {organisation.name}
          </Text>
          <EditOrganisationButton organisation={organisation} />
        </Group>
      </Card>
    );
  }

  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Group justify="space-between">
            <Title order={1} c="white" className={titleClasses.titleUnderline}>
              Organisation Management
            </Title>
            <AddOrganisationButton />
          </Group>
          {organisations.map((organisation) => (
            <Stack key={organisation.id} gap={0} mb="md">
              <OrganisationCard organisation={organisation} />
              {organisation.children.map((childOrg) => (
                <OrganisationCard
                  organisation={{
                    ...childOrg,
                    children: [],
                    logo: null,
                  }}
                  key={childOrg.id}
                  isChild
                />
              ))}
            </Stack>
          ))}
        </Stack>
      }
    />
  );
}
