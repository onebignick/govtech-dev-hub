"use client";

import { Badge } from "@mantine/core";
import { DateTime } from "luxon";

export function DateBadge({
  date,
  format,
}: {
  date: Date;
  format: Intl.DateTimeFormatOptions;
}) {
  return (
    <Badge
      variant="gradient"
      gradient={{ from: "violet", to: "indigo", deg: 90 }}
    >
      {DateTime.fromJSDate(date).toLocaleString(format, {
        locale: "en-sg",
      })}
    </Badge>
  );
}
