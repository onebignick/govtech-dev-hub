import classes from "~/styles/title.module.css";
import Shell from "@frontend/_components/shell";
import { Group, Stack, Title } from "@mantine/core";
import { IdeasList } from "../_components/ideas/ideas-list";
import AddIdeaButton from "../_components/ideas/add-idea-button";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { LoaderDisplay } from "../_components/loader";

export default function Ideas() {
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
          {api.idea.getAll().then((ideas) => (
            <IdeasList ideas={ideas} />
          ))}
        </Stack>
      }
    />
  );
}
