"use client";

import { Center, Loader } from "@mantine/core";
import React from "react";
import Shell from "./shell";

export function LoaderDisplay() {
  return <Loader size="xl" color="blue" type="dots" />;
}

export function LoaderShell() {
  return (
    <Shell
      page={
        <Center h="80vh" w="100%">
          <Loader size="xl" color="blue" type="dots" />
        </Center>
      }
    />
  );
}
