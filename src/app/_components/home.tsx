"use client";

import classes from "~/styles/home.module.css";
import { Container, Text, Group, Button, Center } from "@mantine/core";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { navLinks } from "./shell";

export default function HomePage() {
  const auth = useAuth();

  return (
    <Center h="80vh">
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            inherit
          >
            One-Stop Dev Hub
          </Text>{" "}
          for every{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            GovTechie
          </Text>
        </h1>

        <Text className={classes.description} color="dimmed">
          Ever wanted to figure out what products and tools were available to
          you? Needed to get in touch with a team member for some support? Or
          maybe you just developed a cool Innersource package or wrote a cool
          blog? Come share it with us here!
        </Text>

        <Group className={classes.controls}>
          {auth.userId ? (
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "red", to: "yellow" }}
              component={Link}
              href={navLinks.guides!.link}
            >
              Discover
            </Button>
          ) : (
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "red", to: "yellow" }}
            >
              Login via TechPass
            </Button>
          )}
        </Group>
      </Container>
    </Center>
  );
}
