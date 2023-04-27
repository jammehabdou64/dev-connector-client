import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Widget = () => {
  return (
    <div className="py-5 sticky top-0 left-0 bottom-0 right-0 max-w-[300px]  px-3 bg-gray-900 shadow-xl">
      <h3 className="text-yellow-500 text-center text-lg">
        Friends suggestion
      </h3>
      <div className="user mt-2 py-2 flex items-center justify-between ">
        <div className="flex items-center">
          <Image
            src={"/logo512.png"}
            width={40}
            height={40}
            alt="ww"
            className="w-[30px] h-[30px]"
          />
          <span className="mx-1 text-xs truncate">Lamin Jammeh</span>
        </div>
        <button className="flex items-center p-1 text-xs rounded-md bg-yellow-500 text-gray-900">
          <PlusIcon className="w-3" /> <span>add friend</span>
        </button>
      </div>
      <div className="user mt-2 py-2 flex items-center justify-between ">
        <div className="flex items-center">
          <Image
            src={"/logo512.png"}
            width={40}
            height={40}
            alt="ww"
            className="w-[30px] h-[30px]"
          />
          <span className="mx-1 text-xs truncate">Lamin Jallow</span>
        </div>
        <button className="flex items-center p-1 text-xs rounded-md bg-yellow-500 text-gray-900">
          <PlusIcon className="w-3" /> <span>add friend</span>
        </button>
      </div>
    </div>
  );
};

export default Widget;
