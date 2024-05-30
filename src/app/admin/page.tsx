import { Button } from "@mantine/core";
import Shell from "../_components/shell";

export const metadata = {
  title: "GT Dev Hub Admin",
  description: "Admin Portal",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Home() {
  return <Shell page={<Button>Generate Data</Button>} />;
}
