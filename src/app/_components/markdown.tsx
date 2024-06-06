import { Title, Text } from "@mantine/core";
import Markdown from "markdown-to-jsx";

export function MarkdownDisplay({ markdown }: { markdown: string }) {
  return (
    <div style={{ color: "white" }}>
      <Markdown
        options={{
          overrides: {
            h1: (props) => <Title order={2} {...props} />,
            h2: (props) => <Title order={3} {...props} />,
            h3: (props) => <Title order={4} {...props} />,
            h4: (props) => <Title order={5} {...props} />,
            p: (props) => <Text {...props} mb="md" />,
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
