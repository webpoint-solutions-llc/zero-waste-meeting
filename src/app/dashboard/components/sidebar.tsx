import { Logo } from "@/components/header";
import AnalyticsIcon from "@/icons/analyticsIcon";
import CalanderIcon from "@/icons/calanderIcon";
import DashboardIcon from "@/icons/dashboard";
import SlackIcon from "@/icons/slackIcon.tsx";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: DashboardIcon, label: "Dashboard" },
    { id: "analytics", icon: AnalyticsIcon, label: "Analytics" },
  ];
  const menuItems2 = [
    { id: "calendar", icon: CalanderIcon, label: "Calendar" },
    { id: "slack", icon: SlackIcon, label: "Slack" },
  ];

  return (
    <div
      className={`transition-all duration-300 h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="text-xl font-bold">
            <Logo />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-[#8A8A8A] transition-colors"
        >
          {/* {isCollapsed ? <Menu size={20} /> : <X size={20} />} */}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-grow py-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeItem === item.id ? "#F5F5F5" : "hover:bg-[#8A8A8A]"
                }`}
              >
                <item.icon />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
          <span className=" text-[#8A8A8A]">Integrations</span>
          {menuItems2.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeItem === item.id ? "#F5F5F5" : "hover:bg-[#8A8A8A]"
                }`}
              >
                <item.icon />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center w-full p-3 rounded-lg hover:bg-[#8A8A8A] transition-colors">
          {/* <LogOut size={20} /> */}
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}
