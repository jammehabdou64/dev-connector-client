import { useEffect, useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import SmallMediaFooter from "../../components/SmallMediaFooter";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
export default function UserDetail() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileExist, setProfileExist] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (session?.user) {
      const getProfile = async (id) => {
        const res = await fetch(`http://localhost:8050/api/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setProfileExist(true);
          setProfile(data.message);
          return setLoading(false);
        }

        if (data.success === null) {
          setProfileExist(false);
          return setLoading(false);
        }
      };

      getProfile(id);
    }
  }, [id, session]);
  return (
    <>
      <Header title={"Profile"} />

      <main className="mt-9 md:px-9 px-4 sm:px-10 pt-10">
        {loading ? (
          <h1>Loading</h1>
        ) : profileExist ? (
          <div className="mx-auto h-[400px] bg-gray-900   max-w-4xl">
            <div className="flex px-6 py-5 justify-center items-center h-full flex-col">
              <div>
                <Image
                  width={250}
                  height={250}
                  alt="user-img"
                  src={profile?.user?.avatar}
                  className="rounded-full border-4 border-yellow-500  w-[175px] h-[169px]"
                />
              </div>
              <h3 className="my-4 font-semibold text-2xl">
                {profile?.user?.name}
              </h3>
              <p className=" my-1 text-lg">{profile?.status}</p>
              <p className="text-sm my-1">{profile?.location}</p>
              <div className="flex">
                <div className="space-x-3 my-2 py-3 flex">
                  <button className="bg-gray-800 items-center flex py-2 px-4">
                    <UserIcon className="w-5" />{" "}
                    <span className="mx-1">Add friend</span>
                  </button>
                  <Link
                    href={`/message/${profile?.user?.name.replace(
                      /\s/g,
                      "-"
                    )}/${profile?.user?._id}`}
                    className="text-gray-900 items-center flex  bg-yellow-500 py-2 px-4"
                  >
                    <ChatBubbleLeftEllipsisIcon className="w-5" />
                    <span className="mx-1">Message</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bio bg-gray-900 mt-8 py-4 px-3">
              <h2 className=" py-2 mt-2 font-semibold text-xl text-yellow-500 text-center">
                {profile?.user?.name}'s Bio
              </h2>
              <p className="px-2 text-center">{profile?.bio}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4 relative top-0">
              {/*  */}
              <div className="w-[100%] md:w-64 grid grid-cols-1 mx-auto sm:grid-cols-2  gap-5 md:block lg:sticky relative top-0 bottom-0 ">
                <div className="w-full py-4 bg-gray-900  mt-4 px-3 user-skills">
                  <div className="skills-set">
                    <h2 className=" py-2 my-1 font-semibold text-xl text-yellow-500 text-center">
                      Skill set
                    </h2>
                    <div className="py-3">
                      {profile?.skills.map((skill, index) => (
                        <div
                          className="text-sm font-medium mt-2 flex gap-2 mx-3 px-2"
                          key={index}
                        >
                          <CheckIcon className="w-5" /> {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="w-full py-4 bg-gray-900  mt-4 px-3 user-skills">
                  <div className="skills-set">
                    <h2 className=" py-2 my-1 font-semibold text-xl text-yellow-500 text-center">
                      Experience
                    </h2>
                    <div className="py-3">
                      {profile?.experience.map((experience, index) => (
                        <div className="title text-sm" key={index}>
                          <h4 className="font-semibold text-lg my-3">
                            {experience.company}
                          </h4>
                          <div>
                            <span className="font-semibold">Position:</span>{" "}
                            <span className="px-2">{experience.title}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Description:</span>
                            <span className="px-2">
                              {experience.description}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold">From:</span>
                            <span className="px-2">
                              <Moment format="DD-M-YYYY">
                                {experience.from}
                              </Moment>
                            </span>
                          </div>
                          {!experience.current ? (
                            <div>
                              <span className="font-semibold">To:</span>
                              <span className="px-2">
                                <Moment format="DD-M-YYYY">
                                  {experience.to}
                                </Moment>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="w-full py-4 bg-gray-900  mt-4 px-3 user-skills">
                  <div className="skills-set">
                    <h2 className=" py-2 my-1 font-semibold text-xl text-yellow-500 text-center">
                      Education
                    </h2>
                    <div className="py-3">
                      {profile?.education.map((education, index) => (
                        <div className="title text-sm" key={index}>
                          <h4 className="font-semibold text-lg my-3">
                            {education.school}
                          </h4>
                          <div>
                            <span className="font-semibold">Degree:</span>{" "}
                            <span className="px-2">{education.degree}</span>
                          </div>
                          <div>
                            <span className="font-semibold">
                              Field of study:
                            </span>
                            <span className="px-2">
                              {education.fieldofstudy}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold">Description:</span>
                            <span className="px-2">
                              {education.description}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold">From:</span>
                            <span className="px-2">
                              <Moment format="DD-M-YYYY">
                                {education.from}
                              </Moment>
                            </span>
                          </div>
                          {!education.current ? (
                            <div>
                              <span className="font-semibold">To:</span>
                              <span className="px-2">
                                <Moment format="DD-M-YYYY">
                                  {education.to}
                                </Moment>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
              <div className="flex-1">
                <div>
                  <h3 className="text-center text-yellow-500 text-2xl font-semibold my-3 py-2">
                    Github Reposts
                  </h3>
                  {/*  */}
                  <div className=" p-2 mt-3 bg-gray-900">
                    <div className="flex">
                      <div className="flex-1">
                        <p className="my-1 text-yellow-500 text-lg">
                          react_fileupload
                        </p>
                        <p className="py-2">
                          Lorem ipsum dolor sit, amet consectetur
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*  */}

                  <div className=" p-2 mt-3 bg-gray-900">
                    <p className="my-1 text-yellow-500 text-lg">
                      react_fileupload
                    </p>
                    <p className="py-2">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ducimus porro eius ullam.
                    </p>
                  </div>
                  {/*  */}
                  <div className=" p-2 mt-3 bg-gray-900">
                    <p className="my-1 text-yellow-500 text-lg">
                      nextjs_rest-api
                    </p>
                    <p className="py-2">
                      Lorem ipsum dolor sit, amet consectetur
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-24"></div>
          </div>
        ) : (
          <div className="flex justify-center mt-10 pt-10">
            <p>There is no profile for this user</p>
          </div>
        )}
      </main>
      <SmallMediaFooter />
    </>
  );
}

UserDetail.auth = true;
