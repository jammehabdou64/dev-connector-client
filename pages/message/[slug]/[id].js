import React, { useEffect, useState } from "react";
import {
  PaperAirplaneIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import SmallMediaFooter from "../../../components/SmallMediaFooter";
import Widget from "../../../components/Widget";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Message() {
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (session?.user && id) {
      const getUser = async (id) => {
        const res = await fetch(`http://localhost:8050/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setLoading(false);
          return setUser(data.message);
        }
      };

      const getMessages = async (id) => {
        const res = await fetch(`http://localhost:8050/api/messages/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          return setMessages(data.message);
        }
      };

      getUser(id);
      getMessages(id);
    }
  }, [id, session]);

  const submit = async () => {
    const res = await fetch(`http://localhost:8050/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify({ text, recipient: user?._id }),
    });
    const data = await res.json();
    if (data.success) {
      setMessages([...messages, data.message]);
      setText("");
    }
  };

  return loading ? (
    <h1>Loading ... </h1>
  ) : (
    <>
      <Header />
      <main className="max-w-6xl mt-16 px-4 sm:px-0 md:px-4 lg:px-12 pt-8 mx-auto">
        <div className="flex  sm:px-2 lg:px-0 md:justify-between md:space-x-8">
          <section className="side-bar sm:mx-auto md:mx-0 max-w-[280px] hidden sm:w-[200px] sm:block relative md:block  ">
            <Sidebar />
          </section>
          <section className="flex-1 w-full sm:pl-5 px-4 max-w-[500px] mx-auto md:max-w-[500px] md:pl-8  sm:px-6  lg:pl-16">
            <div className="conversations w-full border border-gray-700">
              <div className="conversations-header flex justify-between items-center p-3 bg-gray-900 w-full">
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={100}
                    alt={user?.name}
                    src={user?.avatar}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <span className="text-lg ml-4">{user?.name}</span>
                </div>
                <div>
                  <VideoCameraIcon className="w-7 cursor-pointer" />
                </div>
              </div>
              <div className="conversation-body h-[365px] w-full p-2">
                {messages?.map((message) => (
                  <div className="w-full" key={message?._id}>
                    {message.recipient === user?._id ? (
                      <div className="w-full flex flex-col items-end">
                        <span className="m-1 py-1 bg-yellow-500  px-2 rounded-md text-gray-900">
                          {message.text}
                        </span>{" "}
                      </div>
                    ) : (
                      <div className="w-full flex flex-col items-start">
                        <span className="m-1 py-1 px-2 rounded-md text-white bg-gray-900">
                          {" "}
                          {message.text}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="conversation-footer bg-gray-900 flex items-center h-[60px] px-2 ">
                <textarea
                  type="text"
                  placeholder="send message .."
                  className="flex-1 bg-inherit py-3 text-lg outline-none h-full "
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />{" "}
                <PaperAirplaneIcon
                  className="w-7 cursor-pointer"
                  onClick={() => submit()}
                />
              </div>
            </div>
          </section>
          <section className="widget relative top-0 w-[300px] hidden lg:block">
            <Widget />
          </section>
        </div>
      </main>
      <SmallMediaFooter />
    </>
  );
}

Message.auth = true;
