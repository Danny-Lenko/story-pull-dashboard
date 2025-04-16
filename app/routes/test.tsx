import type { Route } from "./+types/home";
import { WelcomeTest } from "~/welcome copy/welcome-test";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeTest() {
  return <WelcomeTest />;
}
