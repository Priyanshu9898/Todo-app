import React from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <main className="flex flex-col lg:flex-row lg:h-screen">
      <div className="w-full lg:w-2/5">
        <div className="h-48 lg:h-full relative">
          <Image
            src="/login-banner.jpg"
            alt="Login Banner"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full lg:w-3/5 p-8 md:p-14 flex items-center justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/5">
          <h1 className="text-4xl md:text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-blue-400 cursor-pointer">
              Login
            </Link>
          </p>

          <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group">
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>

          <div className="mt-10 pl-1 flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
            />
          </div>
          <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90">
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
};

export default Register;
