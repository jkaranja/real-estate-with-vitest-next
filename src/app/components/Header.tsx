import React from "react";
import Search from "./Search";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between py-2  px-4 items-center border-b  ">
      <div className="md:w-[50%]">
        <Search placeholder="Search location" />
      </div>

      <div className="flex gap-x-3">
        <Link className=" px-2 text-slate-700  " href="/listings/create">
          Post listing
        </Link>

        <Link className=" px-2 text-slate-700  " href="/favorites">
          Favorites
        </Link>

        <Link className=" px-2 text-slate-700  " href="/contact">
          Contact
        </Link>

        <Link className=" px-2 text-slate-700  " href="/account">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
