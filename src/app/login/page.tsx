"use client";
import Header from "@/components/header";
import Human from "@/icons/human";

import Image from "next/image";

export default function LoginPage() {
  const login = async () => {
    //window href
    window.open("http://localhost:3003/api/v1/auth/google/login", "_self");
    //window href
  };
  return (
    <div className="pb-[115px]">
      <Header />
      <div className=" flex flex-col items-center gap-12 text-center">
        <h1 className="text-5xl font-extrabold">
          Don&apos;t know where <br /> your work time is going?
        </h1>
        <Human />
        <span className="bg-[#F5F5F5] border-2 border-[#FFFFFF] px-4 py-2 rounded-[64px] text-[1rem] font-medium">
          *sshh* its the meetings 🤫😒
        </span>
        <span className=" text-[1rem] font-light">
          Power your accountability and boost productivity with
          <strong> Focus.</strong>
        </span>
        <button
          onClick={() => login()}
          className="bg-[#293DCC] flex gap-2 px-6 py-2 rounded-[8px] text-white justify-center items-center hover:scale-105 transition-all duration-200 ease-in-out active:scale-95"
        >
          Sign up{" "}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.96591 11.6364L4.64773 10.3295L8.10795 6.86932H0V4.94886H8.10795L4.64773 1.49432L5.96591 0.181818L11.6932 5.90909L5.96591 11.6364Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className=" flex flex-col items-center gap-12 text-center pt-[134px]">
        <h1 className="text-5xl font-extrabold">Claim your accountability</h1>
        <div>
          <Image src="/i1.png" alt="First image" width={901} height={700} />
          <div className="flex mt-5 gap-5">
            <Image src="/i2.png" alt="First image" width={441} height={700} />
            <Image src="/i3.png" alt="First image" width={441} height={700} />
          </div>
        </div>
      </div>
    </div>
  );
}
