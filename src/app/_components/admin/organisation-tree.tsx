import {
  Group,
  type RenderTreeNodePayload,
  Tree,
  Card,
  Text,
} from "@mantine/core";
import { api } from "~/trpc/react";
import cardClasses from "~/styles/card.module.css";
import { IconChevronDown } from "@tabler/icons-react";

export function OrganisationTree() {
  const organisationsRes = api.organisation.getAll.useQuery();

  if (!organisationsRes.data) {
    return <div>Loading...</div>;
  }

  const organisations = organisationsRes.data;
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
    console.log(elementProps);
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
    <Tree
      clearSelectionOnOutsideClick
      data={organisationsTree}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
