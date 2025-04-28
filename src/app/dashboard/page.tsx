"use client";
import WellnessCard from "@/components/daily-digest";
import { FocusHours } from "@/components/focushours";
import CookingGauge from "@/components/Speedometer";
import Human from "@/icons/human";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [username, setUsername] = useState("");

  const saveusername = localStorage.getItem("username");

  const [loading, setLoading] = useState(false);

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
      const username = response.data.data.user;
      localStorage.setItem("username", username);
      setUsername(username);
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setLoading(false);
    }
  };

  const FULL_NAME = "Bimala Rai";
  const TIME = new Date().toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
    day: "2-digit",
    month: "short",
  });

  return (
    <div className=" container">
      <div>
        <h1 className="text-5xl font-extrabold">
          Hey, {username || saveusername}
        </h1>
        <div className="flex gap-1 my-3"> 🕧{TIME}</div>
      </div>
      <div>
        <FocusHours />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <CookingGauge />
        <WellnessCard />
      </div>
    </div>
  );
}
