import Link from "next/link";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="text-white border-b-2 mb2">
      <div className="flex justify-between items-center max-w-7xl px-5 mx-auto min-h-16 py-4">
        <Link href={"/"}>
          <h1 className="font-semibold text-2xl">Travel Advisor</h1>
        </Link>
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="font-semibold block">Explore new places</span>
          <Input className="max-w-80 w-full text-white" />
        </div>
      </div>
    </header>
  );
}
