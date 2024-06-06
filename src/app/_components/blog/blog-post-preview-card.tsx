import { Stack, Text, Card, Image, Group } from "@mantine/core";
import Link from "next/link";
import { type BlogPost } from "~/server/api/routers/blogPost";
import cardClasses from "~/styles/card.module.css";
import { navLinks } from "../shell";
import { UserDisplay } from "../user-display";
import { DateTime } from "luxon";
import { DateBadge } from "../date-badge";

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
        <Image
          h="30vh"
          src={blogPost.cover!.url}
          alt={`Cover for ${blogPost.title}`}
        />
      </Card.Section>
      <Stack mt="md">
        <Text size="2em" fw={900} c="white" mb={0} lh={1}>
          {blogPost.title}
        </Text>
        <Group>
          <DateBadge date={blogPost.createdAt} format={DateTime.DATE_MED} />
          <UserDisplay userID={blogPost.authorID} />
        </Group>
      </Stack>
    </Card>
  );
}
