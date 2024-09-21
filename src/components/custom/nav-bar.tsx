import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="absolute md:fixed top-0 right-0 w-full h-fit flex justify-between p-4 backdro-blur-xl z-30">
      <div className="flex flex-row items-center gap-4">
        <ModeToggle />
        <Link href={"/"}>
          <Button className="hidden md:block p-0 text-base" variant={"link"}>
            Task-Tackler
          </Button>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Link href={"/premium"}>
          <Button variant={"outline"}>Task-Tackler+</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant={"outline"}>Dashboard</Button>
        </Link>
        <Button variant={"outline"}>Docs</Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button value={"outline"}>Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
