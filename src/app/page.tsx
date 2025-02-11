import Link from "next/link";
import { InputSandbox } from "~/components/inputSandbox";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <InputSandbox />
      </div>
    </main>
  );
}
