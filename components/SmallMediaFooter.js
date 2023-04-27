import Link from "next/link";
import React from "react";
import { navLists } from "./navLists";

const SmallMediaFooter = () => {
  return (
    <div className="bg-gray-900 fixed w-full  bottom-0  md:hidden">
      <ul className="flex space-x-6 px-4 py-4 justify-between ">
        {navLists.map(({ path, Icon }, index) => (
          <li key={index}>
            <Link href={path}>{<Icon className="w-7 " />}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmallMediaFooter;
