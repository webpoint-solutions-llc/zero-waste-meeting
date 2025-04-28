// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams()
 console.log(params)

  const code = params.code; // Extracting the 'code' parameter from the URL
  console.log("Code from URL:", code); // Logging the extracted code for debugging
  // useEffect(() => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="))
  //     ?.split("=")[1];
  //   if (!token) {
  //     router.replace("/login");
  //   }
  // }, [router]);

  return <>{children}</>;
}
