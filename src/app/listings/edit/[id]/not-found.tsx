import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full py-6 flex-col items-center justify-center gap-2">
      <Frown />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/">
        <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
          Go Back
        </button>
      </Link>
    </main>
  );
}
