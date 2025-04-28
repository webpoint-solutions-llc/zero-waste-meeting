"use client";
import { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import axios from "axios";
import StatCard from "@/components/stat-card";
import MeetingCard from "@/components/meeting-card";

export default function AnalyticsPage() {
  // State to store meetings and stats data
  const [meetings, setMeetings] = useState([]);
  const [loading,setLoading] = useState(false);
  console.log(meetings);
  const [stats, setStats] = useState({
    totalMeetings: { value: "", more: 0 },
    declinedMeetings: { value: "", more: 0 },
    meetingHours: { value: "", percentage: 0 },
    focusHours: { value: "", percentage: 0 },
    teamHours: { value: "", percentage: 0 },
  });

  // Fetch meetings and stats when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
     
      const meetingsData = await fetchMeetings();
      const statsData = await fetchStats();
      setMeetings(meetingsData);
      setStats(statsData);
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <div className="mt-4 md:mt-0 inline-flex items-center border rounded-md px-3 py-2 text-sm">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>Apr 28, 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar with stats */}
        <div className="space-y-6">
          <StatCard
            title="Total Meetings"
            value={stats.totalMeetings.value}
            subtext={`+${stats.totalMeetings.more} more / avg`}
          />

          <StatCard
            title="Declined Meeting"
            value={stats.declinedMeetings.value}
            subtext={`+${stats.declinedMeetings.more} more`}
          />

          <StatCard
            title="Meeting Hours"
            value={stats.meetingHours.value}
            subtext={`+${stats.meetingHours.percentage}% / avg`}
            isPercentage={true}
          />

          <StatCard
            title="Focus Hours"
            value={stats.focusHours.value}
            subtext={`+${stats.focusHours.percentage}% / avg`}
            isPercentage={true}
            isPositive={true}
          />

          <StatCard
            title="Team Hour"
            value={stats.teamHours.value}
            subtext={`+${stats.teamHours.percentage}% / avg`}
            isPercentage={true}
            isPositive={true}
          />
        </div>

        {/* Main content with meeting cards */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            Most time consuming meetings
          </h2>
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

async function fetchMeetings() {
  try {
    const response = await axios.get(
      "http://localhost:3003/api/v1/googlecalender/dailyreport",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const teamMeetings = response.data.teamMeetings;
    return teamMeetings.map((meeting:any, index:number) => ({
      id: 1,
      title: meeting.meetingName,
      duration: `30 mins`,
      totalGuests: meeting.totalAttendees,
      attendees: meeting.attendees.map((email:any, i:any) => ({
        id: i + 1,
        name: email, // You might replace this with actual names if available
        avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png", // Placeholder image
        status: "going", // Adjust if status is available
      })),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to fetch stats data (no React hooks used here)
async function fetchStats() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:3003/api/v1/googlecalender/dailyreport",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const totalmetting = response.data.totalMeetingsToday.totalMeetings;
    const totalHours = response.data.totalMeetingsToday.totalHours;
    console.log(totalmetting);
    // Return the fetched stats data
    return {
      totalMeetings: { value: totalmetting, more: 2 },
      declinedMeetings: { value: 3, more: 1 },
      meetingHours: { value: 3, percentage: 20 },
      focusHours: { value: 3, percentage: 10 },
      teamHours: { value: 3, percentage: 10 },
    };
  } catch (error) {
    console.error(error);
    // Return default stats in case of error
    return {
      totalMeetings: { value: "0 meets", more: 0 },
      declinedMeetings: { value: "0 dec", more: 0 },
      meetingHours: { value: "0 hr", percentage: 0 },
      focusHours: { value: "0 hr", percentage: 0 },
      teamHours: { value: "0 hrs", percentage: 0 },
    };
  }
}
