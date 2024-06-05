"use client";

import classes from "~/styles/title.module.css";
import Shell from "@frontend/_components/shell";
import { Group, Stack, Title } from "@mantine/core";
import { IdeasList } from "../_components/ideas/ideas-list";
import AddIdeaButton from "../_components/ideas/add-idea-button";
import { api } from "~/trpc/react";
import { LoaderShell } from "../_components/loader";

export default function Ideas() {
  const ideasRes = api.idea.getAll.useQuery();

  if (!ideasRes.data) {
    return <LoaderShell />;
  }

  const ideas = ideasRes.data;

  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between" mb="md">
            <Title order={1} c="white" className={classes.titleUnderline}>
              Ideas Exchange
            </Title>
            <AddIdeaButton />
          </Group>
          <IdeasList ideas={ideas} />
        </Stack>
      }
    />
  );
}
