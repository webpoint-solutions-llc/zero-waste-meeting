import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import StatCard from "../../components/stat-card";
import MeetingCard from "../../components/meeting-card";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Meeting analytics dashboard",
};

export default async function AnalyticsPage() {
  // In a real app, this would be fetched from an API
  const meetings = await fetchMeetings();
  const stats = await fetchStats();

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <div className="mt-4 md:mt-0 inline-flex items-center border rounded-md px-3 py-2 text-sm">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>Apr 7 - 11, 2025</span>
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

// This would be in a separate API service file in a real app
async function fetchMeetings() {
  // In a real app, this would be an API call
  // const res = await fetch('/api/meetings');
  // return res.json();

  return [
    {
      id: 1,
      title: "Morning yap session by the team",
      startTime: "9:45",
      endTime: "10:00",
      period: "am",
      duration: "1 hour 30 mins",
      teamHour: "6 hour",
      totalGuests: 4,
      isExpanded: true,
      isYes: true,
      hourText: "1 hour",
      attendees: [
        {
          id: 1,
          name: "Sagar Acharya",
          avatar: "/sagar.png",
          status: "going",
        },
        {
          id: 2,
          name: "Bimala Rai",
          avatar: "/bimala.png",
          status: "going",
        },
        {
          id: 3,
          name: "Bishal Rajbahak",
          avatar: "/bishal.png",
          status: "not-going",
        },
        {
          id: 4,
          name: "Padam Thapa",
          avatar: "/padam.png",
          status: "not-going",
        },
      ],
      summary: [
        {
          type: "negative",
          text: "At least two guests usually not joining the meeting",
        },
        { type: "negative", text: "Goes longer than intended" },
        { type: "positive", text: "Regular guests, less friction" },
        { type: "info", text: "Remove the users that are not joining" },
        { type: "info", text: "Increase the estimated time" },
      ],
    },
    {
      id: 2,
      title: "Engineering Sync Up",
      startTime: "11:30",
      endTime: "12:30",
      period: "am",
      duration: "1 hour",
      isExpanded: false,
      isYes: true,
      hourText: "1 hr",
    },
    {
      id: 3,
      title: "Engineering Sync Up",
      startTime: "11:30",
      endTime: "12:30",
      period: "am",
      duration: "1 hour",
      isExpanded: false,
      isYes: true,
      hourText: "1 hr",
    },
    {
      id: 4,
      title: "Engineering Sync Up",
      startTime: "11:30",
      endTime: "12:30",
      period: "am",
      duration: "1 hour",
      isExpanded: false,
      isYes: true,
      hourText: "1 hr",
    },
  ];
}

async function fetchStats() {
  // In a real app, this would be an API call
  // const res = await fetch('/api/stats');
  // return res.json();

  return {
    totalMeetings: { value: "4 meets", more: 2 },
    declinedMeetings: { value: "1 dec", more: 1 },
    meetingHours: { value: "3.2 hr", percentage: 20 },
    focusHours: { value: "4.4 hr", percentage: 10 },
    teamHours: { value: "128 hrs", percentage: 10 },
  };
}
