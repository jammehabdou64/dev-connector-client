import Image from "next/image";
import Link from "next/link";
import React from "react";

const Message = () => {
  return (
    <Link
      href={"/message/Abdou-jammeh/121321214253"}
      className="max-w-[400px] lg:max-w-[450px] md:max-w-[400px] mx-auto px-4 sm:px-0 mt-2 sm:pl-7 md:px-5 lg:pl-12"
    >
      <div className="flex w-full space-x-2 items-center p-2 bg-gray-900 ">
        <div>
          <Image
            src={"/abdou.jpg"}
            width={50}
            height={45}
            alt="name"
            className="w-[50px] h-[40px] rounded-full"
          />
        </div>
        <div>
          <div className="flex text-lg">
            <p className="mx-2">Abdou Jammeh</p>
            <p>Nov 12 ,2023</p>
          </div>
          <div className=" text-xs -mt-1">
            {` Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima
            minus ipsam explicabo accusantium ex repudiandae voluptatum esse
            quas quisquam a enim, cum excepturi harum at amet eveniet blanditiis
            ab?`.substring(0, 100)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Message;
