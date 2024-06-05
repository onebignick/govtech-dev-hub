import { Stack, Text, Card, Image, Badge, Group } from "@mantine/core";
import Link from "next/link";
import { type BlogPost } from "~/server/api/routers/blogPost";
import cardClasses from "~/styles/card.module.css";
import { navLinks } from "../shell";
import { UserDisplay } from "../userDisplay";
import { DateTime } from "luxon";

export function BlogPostPreviewCard({ blogPost }: { blogPost: BlogPost }) {
  return (
    <Card
      component={Link}
      href={`${navLinks.blog?.link}/${blogPost.id}`}
      key={blogPost.id}
      className={cardClasses.card}
      shadow="xs"
    >
      <Card.Section>
        <Image src={blogPost.cover!.url} alt={`Cover for ${blogPost.title}`} />
      </Card.Section>
      <Stack mt="md">
        <Text size="2em" fw={900} c="white" mb={0} lh={1}>
          {blogPost.title}
        </Text>
        <Group>
          <Badge
            variant="gradient"
            gradient={{ from: "violet", to: "indigo", deg: 90 }}
          >
            {DateTime.fromJSDate(blogPost.createdAt).toLocaleString(
              DateTime.DATE_MED,
            )}
          </Badge>
          <UserDisplay userID={blogPost.authorID} />
        </Group>
      </Stack>
    </Card>
  );
}
