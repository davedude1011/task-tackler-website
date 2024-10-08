"use client";

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
        <Link href={"/dashboard"}>
          <Button variant={"default"}>Dashboard</Button>
        </Link>
        {/*<Button variant={"outline"}>Docs</Button>*/}

        <Button
          onClick={() =>
            window.open("https://github.com/davedude1011/taskTackler/issues")
          }
          variant={"destructive"}
        >
          Report Issues
        </Button>
        <Button
          onClick={() =>
            window.open("https://github.com/davedude1011/taskTackler")
          }
          variant={"outline"}
        >
          Github
        </Button>
        <Link href={"/premium"}>
          <Button variant={"outline"}>Task-Tackler+</Button>
        </Link>
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
