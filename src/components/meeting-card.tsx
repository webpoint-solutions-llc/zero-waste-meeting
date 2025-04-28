"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Info } from "lucide-react"
import Image from "next/image"

interface Attendee {
  id: number
  name: string
  avatar: string
  status: "going" | "not-going"
}

interface SummaryItem {
  type: "positive" | "negative" | "info"
  text: string
}

interface MeetingProps {
  id: number
  title: string
  startTime: string
  endTime: string
  period: string
  duration?: string
  teamHour?: string
  totalGuests?: number
  isExpanded: boolean
  isYes: boolean
  hourText: string
  attendees?: Attendee[]
  summary?: SummaryItem[]
}

export default function MeetingCard({ meeting }: { meeting: MeetingProps }) {
  const [isExpanded, setIsExpanded] = useState(meeting.isExpanded)

  const borderColor =
    meeting.id === 1
      ? "border-l-blue-500"
      : meeting.id === 2
        ? "border-l-green-500"
        : meeting.id === 3
          ? "border-l-green-500"
          : "border-l-green-200"

  return (
    <div className={`bg-white rounded-lg border-l-4 ${borderColor} border shadow-sm`}>
      <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="font-medium">{meeting.title}</h3>
          <p className="text-sm text-gray-500">
            {meeting.startTime} - {meeting.endTime} {meeting.period} • {meeting.hourText} •{" "}
            {meeting.isYes ? "Yes" : "No"}
          </p>
        </div>
        <button className="text-gray-500">{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
      </div>

      {isExpanded &&
        meeting.duration &&
        meeting.teamHour &&
        meeting.totalGuests &&
        meeting.attendees &&
        meeting.summary && (
          <div className="px-4 pb-4 border-t">
            <div className="grid grid-cols-3 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-500">Duration:</p>
                <p className="text-sm">{meeting.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Team hour:</p>
                <p className="text-sm">{meeting.teamHour}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total guests:</p>
                <p className="text-sm">{meeting.totalGuests} guests</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {meeting.attendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
                      <Image
                        src={attendee.avatar || "/placeholder.svg"}
                        alt={attendee.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback for missing images
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(attendee.name)}&background=random`
                        }}
                      />
                    </div>
                    <span className="text-sm">{attendee.name}</span>
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      attendee.status === "going" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                    }`}
                  >
                    {attendee.status === "going" ? "Going" : "Not going"}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-medium mb-2">Summary</h4>
              <ul className="space-y-2">
                {meeting.summary.map((item, index) => (
                  <li key={index} className="flex items-start">
                    {item.type === "negative" && <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />}
                    {item.type === "positive" && <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />}
                    {item.type === "info" && <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />}
                    <span className="text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </div>
  )
}
