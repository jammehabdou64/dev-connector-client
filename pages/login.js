import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { data: session } = useSession();
  const route = useRouter();
  const { redirect } = route.query;
  useEffect(() => {
    if (session?.user) {
      route.push(redirect || "/");
      return;
    }
  }, [route, session, redirect]);

  const inputHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    try {
      e.preventDefault();
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (result.error) {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error.response.data.error?.email);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        action=""
        method="post"
        className="w-[400px] px-3"
        onSubmit={(e) => submit(e)}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-200 my-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={(e) => inputHandler(e)}
            className={`outline-none bg-gray-700 py-2 px-4 rounded-md ${
              error ? "border-red-600 border" : ""
            }`}
          />
          <small className={error ? "text-red-600" : "hidden"}>{error}</small>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-gray-200 my-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            className="outline-none bg-gray-700 py-2 px-4 rounded-md focus:bg-inherit"
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <div className="flex justify-between my-4">
          <div>
            <input
              type="checkbox"
              className="text-gray-200 "
              name=""
              id="remember-me"
            />
            <label htmlFor="remember-me " className="ml-1 text-gray-300">
              Remember me
            </label>
          </div>
          <div>
            <Link href={"/password-recovery"} className="text-blue-400">
              forgetten password
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <button className="font-medium bg-yellow-500 text-gray-900 p-3 w-full rounded-md">
            Login
          </button>
        </div>
        <div className="mt-4">
          Don't have an account?
          <Link href={"/register"} className="ml-1 text-blue-400">
            register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
