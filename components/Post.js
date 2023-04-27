import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

const Post = ({
  author,
  title,
  image,
  text,
  createAt,
  comments,
  likes,
  profile,
}) => {
  const { data: session } = useSession();
  return (
    <div className="post mt-8 bg-gray-900">
      <div className="post-author px-3 py-4 ">
        <div className="post-author-details flex items-center justify-between ">
          <Link
            href={`/${author.name.replace(/\s/g, "-")}/${author._id}`}
            className="flex items-center flex-1 gap-3"
          >
            <Image
              src={author?.avatar}
              width={30}
              height={30}
              alt="image"
              className="w-[50px] h-[50px] object-center rounded-full"
            />
            <div className="post-author-name font-semibold">{author.name}</div>
          </Link>
          <div>
            <Moment fromNow>{createAt}</Moment>
          </div>
        </div>

        <div className={title ? "post-title my-1 pt-1  text-sm" : "hidden"}>
          {title ? title : ""}
        </div>
      </div>
      <div className={text ? "p-2" : "post-body"}>
        {image ? (
          <Image
            src={image}
            alt="image"
            className="max-h-[410px]  w-full"
            width={300}
            height={300}
          />
        ) : (
          text
        )}
      </div>
      <div className="flex p-4 justify-between bg-gray-900 post-reactions">
        <div className="flex gap-2 items-center">
          <HeartIcon className="w-5 text-yellow-500" />{" "}
          <span className="text-sm">
            {likes.length > 0 ? likes.length : ""}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <ChatBubbleLeftEllipsisIcon className="w-5" />{" "}
          <span className="text-sm">
            {comments.length > 0 ? comments.length : ""}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <ShareIcon className="w-5" /> <span className="text-sm">10</span>
        </div>
      </div>
      <div className="comment p-1 border-t border-gray-700 flex">
        <Image
          src={session?.user?.avatar}
          width={20}
          height={20}
          alt={session?.user?.name}
          // alt="image"
          className="w-[35px]  h-[35px] object-center rounded-full"
        />
        <input
          type="text"
          className="flex-1 py-1 px-2 mx-1 bg-gray-800 rounded-full"
          placeholder="comment ..."
        />
        <PaperAirplaneIcon className="w-6" />
      </div>
    </div>
  );
};

export default Post;
