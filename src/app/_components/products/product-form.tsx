import {
  Stack,
  Button,
  Group,
  TextInput,
  NativeSelect,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { type Product, type ProductInput } from "~/server/api/routers/product";
import { ProductFeaturesInput } from "./product-features-input";
import { ProductChangelogsInput } from "./product-changelogs-input";
import { UploadInput } from "../upload-input";
import { ProductLinksInput } from "./product-links-input";
import { ProductContactsInput } from "./product-contacts-input";
import { ProductOrganisationInput } from "./product-organisation-input";

export function ProductForm({
  initialValues,
  submitForm,
}: {
  initialValues?: Product;
  submitForm: (object: ProductInput) => void;
}) {
  const form = useForm<ProductInput>({
    mode: "uncontrolled",
    initialValues: {
      id: initialValues?.id ?? "",
      type: initialValues?.type ?? "PRODUCT",
      name: initialValues?.name ?? "",
      oneLiner: initialValues?.oneLiner ?? "",
      summary: initialValues?.summary ?? "",
      links: initialValues?.links ?? [],
      features: initialValues?.features ?? [],
      changelogs: initialValues?.changelogs ?? [],
      contacts: initialValues?.contacts ?? [],
      admins: [],
      logo: initialValues?.logo.url ?? "",
      cover: initialValues?.cover?.url ?? "",
      organisationId: initialValues?.organisationId ?? undefined,
    },
    validate: {
      id: isNotEmpty("ID is required"),
      name: isNotEmpty("Name is required"),
      logo: isNotEmpty("Logo is required"),
      organisationId: (value, values) => {
        return (values.type === "AGENCY" || "PRODUCT") &&
          value &&
          value.length > 0
          ? null
          : "Choose an organisation";
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submitForm(values);
      })}
    >
      <Stack>
        <Group grow align="flex-start">
          <NativeSelect
            withAsterisk
            key={form.key("type")}
            label="Type"
            description="Is it a full GovTech product? A one-time project for an agency? Or a cool Innersource package?"
            data={[
              { label: "GovTech Product", value: "PRODUCT" },
              { label: "Agency Project", value: "AGENCY" },
              { label: "Development Tool", value: "DEVTOOL" },
              { label: "Innersource Project", value: "INNERSOURCE" },
              { label: "Prototype", value: "PROTOTYPE" },
            ]}
            {...form.getInputProps("type")}
          />
          <ProductOrganisationInput form={form} />
        </Group>
        <TextInput
          withAsterisk
          label="ID"
          placeholder="e.g. ship-hats"
          description="Only accepts lowercase letters and numbers. No spaces or uppercase."
          key={form.key("id")}
          disabled={initialValues !== null && initialValues !== undefined}
          {...form.getInputProps("id")}
        />
        <TextInput
          withAsterisk
          label="Name"
          placeholder="e.g. SHIP-HATS"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="One-Liner"
          description="A short single line description."
          placeholder="e.g. SHIP-HATS is a suite of development tools"
          key={form.key("oneLiner")}
          {...form.getInputProps("oneLiner")}
        />
        <Group align="flex-start" grow>
          <UploadInput
            withAsterisk
            label="Logo"
            description="Upload a square icon"
            key={form.key("logo")}
            {...form.getInputProps("logo")}
          />
          <UploadInput
            label="Cover"
            description="Upload a 16:9 image"
            key={form.key("cover")}
            {...form.getInputProps("cover")}
          />
        </Group>
        <Textarea
          withAsterisk
          label="Summary"
          description="Quick summary to be displayed on the Products page"
          placeholder="SHIP-HATS is a suite of products for GovTech"
          key={form.key("summary")}
          {...form.getInputProps("summary")}
        />
        <ProductLinksInput form={form} />
        <ProductFeaturesInput form={form} />
        <ProductChangelogsInput form={form} />
        <ProductContactsInput form={form} />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 90 }}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
