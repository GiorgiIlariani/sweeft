import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b px-2">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <div className="flex w-32 justify-end gap-3">
          <div className="flex items-center gap-5">
            <Link href="/history" className="text-lg font-semibold">
              History
            </Link>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline">
                <Link href="/sign-in">Login</Link>
              </button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
