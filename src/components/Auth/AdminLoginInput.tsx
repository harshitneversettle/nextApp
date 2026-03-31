"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { ShowNotification } from "../Notification/ShowNotification";
import { useRouter } from "next/navigation";

export default function AdminLoginInput() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [noti, setNoti] = useState<{
    id: number;
    type: "success" | "error";
    status: number;
    message: string;
  }>();

  const router = useRouter();

  async function handleLogin() {
    if (!emailRef.current || !passwordRef.current) return;

    try {
      const res = await axios.post("/api/admin-login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log(res.data);

      setNoti({
        id: Date.now(),
        type: res.data.type,
        status: res.status,
        message: res.data.message,
      });
      alert(res.data.message);
      router.push("/get-started");
    } catch (error) {
      console.log(error);
      setNoti({
        id: Date.now(),
        type: "error",
        status: 500,
        message: "Internal server error",
      });
    }
    setLoading(false);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }
  return (
    <div className="">
      {noti && (
        <ShowNotification
          id={noti.id}
          status={noti.status}
          message={noti.message}
          type={noti.type}
        />
      )}
      <div className="text-white bg-gray-950 border border-amber-50 rounded-xl px-3 md:px-10 py-5 ">
        <div className="flex flex-col gap-7 text-xl">
          <div className="">
            Email :{" "}
            <input
              type="email"
              ref={emailRef}
              minLength={13}
              maxLength={60}
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
          </div>

          <button
            onClick={() => {
              setLoading(true);
              handleLogin();
            }}
            className="bg-green-700 text-white tracking-widest font-mono text-lg rounded-lg px-2 py-1 mt-4 hover:bg-green-800/80 transition-all"
          >
            {loading ? "logging in.." : "Login"}
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  mt-3">
        <span className="text-white ">
          Don't have an account ?{" "}
          <button
            onClick={() => {
              router.push("/admin-sign-up");
            }}
            className="text-blue-500"
          >
            Sign up{" "}
          </button>
        </span>
      </div>
    </div>
  );
}
