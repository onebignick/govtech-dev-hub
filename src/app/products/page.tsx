import Shell from "@frontend/_components/shell";

export const metadata = {
  title: "One GT Hub",
  description: "Bringing us to One GovTech",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Home() {
  return <Shell page={<p>Test</p>} />;
}
