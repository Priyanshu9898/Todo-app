"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useAuth } from "@firebase/auth.js";
import Loading from "../loading.js";

const Register = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const {authUser, isLoading, setAuthUser} = useAuth();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if(!isLoading && authUser) {
      router.push('/')
    }
  }, [authUser, isLoading, router]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;

    if (!name || !email || !password) {
      return;
    }

    console.log(name, email, password);

    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      setAuthUser({
        uid: user.uid,
        name: user.displayName,
        email: user.email
      })

      console.log("User created successfully ", user);

      setValues({
        name: "",
        email: "",
        password: "",
      });

      redirect("/login");
    } catch (err) {
      console.error("error: " + err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, provider);

      console.log("user: ", user);
    } catch (err) {
      console.log("error", err);
    }
  };

  return ( isLoading || (!isLoading && authUser) ? (<><Loading /> </>) : (
    <main className="flex flex-col lg:flex-row lg:h-screen">
      <div className="w-full lg:w-2/5">
        <div className="h-48 lg:h-full relative">
          <Image
            src="/login-banner.jpg"
            alt="Login Banner"
            fill={true}
            className="object-cover"
            priority={true}
          />
        </div>
      </div>
      <div className="w-full lg:w-3/5 p-8 md:p-14 flex items-center justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/5">
          <h1 className="text-4xl md:text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-blue-400 cursor-pointer"
            >
              Login
            </Link>
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
          >
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
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-10 pl-1 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  )
  );
};

export default Register;
