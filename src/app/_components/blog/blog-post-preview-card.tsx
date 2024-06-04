import { Stack, Text, Card, Image } from "@mantine/core";
import Link from "next/link";
import { type BlogPost } from "~/server/api/routers/blogPost";
import cardClasses from "~/styles/card.module.css";
import { navLinks } from "../shell";

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
      <Stack gap={0} my="md">
        <Text
          c="white"
          fw={800}
        >{`${blogPost.createdAt.toLocaleDateString()}`}</Text>
        <Text size="2em" fw={900} c="white" mb={0} lh={1}>
          {blogPost.title}
        </Text>
        <Text>{`by John Tan`}</Text>
      </Stack>
    </Card>
  );
}
