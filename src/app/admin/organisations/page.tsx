"use client";

import { OrganisationTree } from "~/app/_components/admin/organisation-tree";
import { LoaderShell } from "~/app/_components/loader";
import { api } from "~/trpc/react";

export default function OrganisationAdmin() {
  const organisationsRes = api.organisation.getAll.useQuery();

  if (!organisationsRes.data) {
    return <LoaderShell />;
  }

  const organisations = organisationsRes.data;

  return <OrganisationTree organisations={organisations} />;
}
