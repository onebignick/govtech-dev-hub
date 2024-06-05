"use client";

import { Group, Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import titleClasses from "~/styles/title.module.css";
import AddOrganisationButton from "~/app/_components/organisations/add-organisation-button";
import { OrganisationTree } from "~/app/_components/admin/organisation-tree";

export default function OrganisationAdmin() {
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
          <OrganisationTree />
        </Stack>
      }
    />
  );
}
