import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profileSlice";

const Sidebar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchProfile(session?.user?.accessToken));
  }, [dispatch, session]);
  return (
    <div className="md:w-[250px] sm:w-[190px] sticky top-0 left-0 bottom-0 right-0 py-5 px-1 bg-slate-900 shadow-2xl">
      <div className="user ">
        <div className="flex justify-center">
          <Image
            src={session?.user?.avatar}
            width={70}
            height={70}
            alt={session?.user?.name}
            className="rounded-full w-[70px] h-[69px] object-fill"
          />
        </div>
        <p className="text-center text-lg my-5 font-semibold">
          {session?.user?.name}
        </p>
      </div>
      <div className="user-details  flex justify-around">
        <div className="">
          <p>Friends</p>
          <p className="text-center text-yellow-500">
            {profile?.user?.friends.length}
          </p>
        </div>
        <div className="">
          <p>viewied profile</p>
          <p className="text-center text-yellow-500">2</p>
        </div>
      </div>
      {/* <div className="px-1 groups">
        <h4 className="text-yellow-500  my-3">groups</h4>
        <p>#web development</p>
        <p>#node developer</p>
        <p>#react developer</p>
        <p>#node and express</p>
      </div> */}
    </div>
  );
};

export default Sidebar;
