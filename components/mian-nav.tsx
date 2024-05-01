import Link from "next/link";
import React from "react";

const MainNav = async () => {
  return (
    <nav className="flex justify-between sticky top-0 p-4 bg-white dark:bg-black">
      <div className="flex gap-2 items-center">
        <Link href="/">Fredex</Link>
      </div>
    </nav>
  );
};

export default MainNav;
