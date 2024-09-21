import Link from "next/link";
import NavBar from "~/components/custom/nav-bar";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <NavBar />
      <div className="text-3xl md:text-6xl">Succesfully Purchased</div>
      <div className="flex flex-row gap-4">
        <Link href={"/"}>
          <Button variant={"outline"}>Home</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant={"default"}>Dashboard</Button>
        </Link>
        <Link href={"/docs"}>
          <Button variant={"outline"}>Docs</Button>
        </Link>
      </div>
    </div>
  );
}
