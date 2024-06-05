import { OrganisationTree } from "~/app/_components/admin/organisation-tree";
import { Suspense } from "react";
import { LoaderShell } from "~/app/_components/loader";
import { api } from "~/trpc/server";

export default function OrganisationAdmin() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.organisation
        .getAll()
        .then((organisations) =>
          organisations ? (
            <OrganisationTree organisations={organisations} />
          ) : null,
        )}
    </Suspense>
  );
}
