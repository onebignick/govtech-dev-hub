import Shell from "@frontend/_components/shell";
import HomePage from "./_components/home";

export const metadata = {
  title: "One GT Hub",
};

export default function Home() {
  return <Shell page={<HomePage />} />;
}
