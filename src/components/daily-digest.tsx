import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";

export default function WellnessCard() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-2xl font-medium text-gray-800">Wellness</h2>
        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
      </div>

      <div className="rounded-lg p-6 space-y-4 border border-[#D3D7D9] h-full">
        <div className="text-blue-600 font-medium">Daily Digest</div>

        <blockquote className="text-2xl font-medium leading-tight">
          &quot;Monday is the most common day of the week for people to be
          admitted to hospital with a life-threatening heart attack.&quot;
        </blockquote>

        <div className="flex items-center text-gray-500 text-sm mt-8">
          <span>Source:</span>
          <Link
            href="https://www.bhf.org.uk"
            className="flex items-center ml-2 text-blue-600 hover:underline"
          >
            British Heart Foundation
            <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
