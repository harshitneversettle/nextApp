"use client";
import GeneratePassword from "@/helpers/PasswordGenerator";
import axios from "axios";
import { useRef, useState } from "react";

export default function AdminSignupInput() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState<boolean>(false);

  async function handleSignUp() {
    try {
      const res = await axios.post("/api/admin", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <div className="text-white bg-gray-950 border border-amber-50 rounded-xl px-3 md:px-10 py-5 ">
        <div className="flex flex-col gap-7 text-xl">
          <div className="">
            Name :
            <input
              type="text"
              ref={nameRef}
              required
              maxLength={20}
              minLength={4}
              name=""
              id="name"
              placeholder="name"
              className="bg-white ml-15 text-black px-2 py-1 rounded-lg"
            />
          </div>
          <div className="">
            Email :{" "}
            <input
              type="email"
              ref={emailRef}
              minLength={13}
              maxLength={20}
              required
              name=""
              id=""
              placeholder="email"
              className="bg-white ml-15 text-black px-2 py-1 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <div className="">
              Password :{" "}
              <input
                type={showPass ? "text" : "password"}
                ref={passwordRef}
                maxLength={8}
                minLength={6}
                required
                name=""
                id=""
                placeholder="password"
                className="bg-white ml-6 text-black px-2 py-1 rounded-lg"
              />
            </div>
            <div className="text-end text-sm mt-1">
              <button
                onClick={() => {
                  if (!passwordRef.current) return;
                  const pass = GeneratePassword(8);
                  passwordRef.current.value = pass;
                  setShowPass(true);
                }}
              >
                Generate
              </button>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="bg-green-700 text-white tracking-widest font-mono text-lg rounded-lg px-2 py-1 mt-4 hover:bg-green-800/80 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  mt-3">
        <span className="text-white ">
          Already have an account ?{" "}
          <span className="text-blue-500">log in </span>
        </span>
      </div>
    </div>
  );
}
