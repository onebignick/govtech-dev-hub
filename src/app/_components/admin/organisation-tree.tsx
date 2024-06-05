import {
  Group,
  type RenderTreeNodePayload,
  Tree,
  Card,
  Text,
  Stack,
  Title,
} from "@mantine/core";
import titleClasses from "~/styles/title.module.css";
import cardClasses from "~/styles/card.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { type Organisation } from "~/server/api/routers/organisation";
import AddOrganisationButton from "../organisations/add-organisation-button";
import Shell, { navLinks } from "../shell";

export function OrganisationTree({
  organisations,
}: {
  organisations: Organisation[];
}) {
  const organisationsTree = organisations
    .filter((organisations) => !organisations.parentID)
    .map((organisation) => ({
      value: organisation.acronym,
      label: organisation.name,
      children: organisation.children.map((child) => ({
        value: child.acronym,
        label: child.name,
      })),
    }));

  function Leaf({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: RenderTreeNodePayload) {
    return (
      <Card
        key={node.value}
        shadow="xs"
        {...{
          ...elementProps,
          className:
            elementProps.className &&
            (hasChildren ? cardClasses.card : cardClasses.staticCard),
        }}
        my="sm"
      >
        <Group gap={5}>
          {hasChildren && (
            <IconChevronDown
              size={18}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          )}
          <Text size="h3" c="white" fw={900}>
            {node.value}
          </Text>
          <Text size="md" c="white">
            {node.label}
          </Text>
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
          <Tree
            clearSelectionOnOutsideClick
            data={organisationsTree}
            renderNode={(payload) => <Leaf {...payload} />}
          />
        </Stack>
      }
    />
  );
}
