import React, { useEffect, useState } from "react";
import {
  FilmIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import Post from "./Post";
import { fetchProfile } from "../features/profileSlice";

const Feeds = () => {
  const [formData, setFormData] = useState({
    text: "",
    image: "",
    title: "",
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { status, data: session } = useSession();

  const inputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const imageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const { posts } = useSelector((state) => state.post);
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    if (session?.user) {
      dispatch(fetchPosts(session.user?.accessToken));
      dispatch(fetchProfile(session.user?.accessToken));
      setLoading(false);
    }
  }, [session, dispatch]);

  const submit = async (e) => {
    const jsFormData = new FormData();
    console.log(formData.image ? "true" : "false");
    jsFormData.append("title", formData.image ? formData.text : "");
    jsFormData.append("text", formData.image ? "" : formData.text);
    jsFormData.append("image", formData.image);
    const res = await fetch("http://localhost:8050/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: jsFormData,
    });

    const data = await res.json();
    console.log(data);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="feeds-container sm:pl-4 md:pl-2 lg:pl-12 max-w-[400px] mx-auto   sm:w-[400px]  md:w-[440px] lg:max-w-[450px] ">
      <div className="post-container py-3 px-4 bg-gray-900">
        <div className="flex mt-2 pt-2 gap-2 ">
          <Image
            src={session?.user?.avatar}
            width={50}
            height={50}
            alt={session?.user?.name}
            className="w-[50px] h-[50px] object-center rounded-full"
          />
          <div className="flex-1">
            <form action="" method="post" className="w-full relative top-0">
              <textarea
                type="text"
                name="text"
                value={formData.text}
                onChange={(e) => inputChangeHandler(e)}
                id=""
                className="h-11 w-full text-sm p-3 outline-none bg-gray-700 rounded-full"
                placeholder="post feed"
              />{" "}
            </form>
          </div>
          <PaperAirplaneIcon
            className={"w-7 cursor-pointer"}
            onClick={(e) => submit(e)}
          />
        </div>
        <div className="flex py-2 mt-4 justify-between">
          <div className="">
            <input
              type="file"
              className="hidden"
              id="select-img"
              onChange={(e) => imageChange(e)}
            />
            <label
              htmlFor="select-img"
              className="flex items-center cursor-pointer"
            >
              {" "}
              <PhotoIcon className="w-7 text-green-500" />
              <span className="ml-2">photo</span>
            </label>
          </div>
          <div className="flex items-center cursor-pointer">
            <FilmIcon className="w-7 text-yellow-500 " />
            <span className="ml-2">video</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <VideoCameraIcon className="w-7 text-red-500" />
            <span className="ml-2">live</span>
          </div>
        </div>
      </div>

      <div className="feed-posts mt-6">
        {posts.map((post) => (
          <Post
            title={post?.title}
            author={post.author}
            comments={post.comments}
            image={post?.image}
            createAt={post.createdAt}
            likes={post.likes}
            key={post._id}
            text={post?.text}
            profile={profile}
          />
        ))}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Feeds;
