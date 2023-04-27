import { Inter } from "@next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className="mx-auto px-16 container mt-10 h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className={`text-2xl ${inter.className}`}>Access Denied</h1>
        {message && (
          <div className={`${inter.className} mb-4 text-red-500`}>
            {message}
          </div>
        )}

        <Link
          href={"/login"}
          className="border py-1 px-6 bg-white text-gray-900"
        >
          {" "}
          login
        </Link>
      </div>
    </div>
  );
}
