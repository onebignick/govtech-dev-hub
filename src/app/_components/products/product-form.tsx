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
      logo: "",
      cover: "",
    },
    validate: {
      id: isNotEmpty("Name is required"),
      name: isNotEmpty("Name is required"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        submitForm(values);
      })}
    >
      <Stack>
        <NativeSelect
          withAsterisk
          key={form.key("type")}
          label="Type"
          description="Is it a full GovTech product? A one-time project for an agency? Or a cool Innersource package?"
          data={[
            { label: "GovTech Product", value: "PRODUCT" },
            { label: "Agency Project", value: "PROJECT" },
            { label: "Prototype", value: "PROTOTYPE" },
            { label: "Innersource Project", value: "INNERSOURCE" },
          ]}
          {...form.getInputProps("type")}
        />
        <TextInput
          withAsterisk
          label="ID"
          placeholder="e.g. ship-hats"
          description="Only accepts lowercase letters and numbers. No spaces or uppercase."
          key={form.key("id")}
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
