import { UserButton } from "@clerk/nextjs";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between p-4 h-20">
      <Logo />
      <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
