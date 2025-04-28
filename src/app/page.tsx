"use client";

import { FocusHours } from "@/components/focushours";
import Speedometer from "@/components/Speedometer";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    getAccesstoken();
  }, [code]);

  const getAccesstoken = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3003/api/v1/auth/exchange-code",
        { code }
      );
      const accesstoken = response.data.data.access_token;
      const refreshToken = response.data.data.refresh_token;
      localStorage.setItem("accessToken", accesstoken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Code from URL: {code}</p>
      <p>Welcome to Dashboard!</p>
      <Speedometer />
      <FocusHours />
    </div>
  );
}
