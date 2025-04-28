import { useRouter } from "next/navigation"; // <-- Import router
import { Logo } from "@/components/header";
import AnalyticsIcon from "@/icons/analyticsIcon";
import CalanderIcon from "@/icons/calanderIcon";
import DashboardIcon from "@/icons/dashboard";
import SlackIcon from "@/icons/slackIcon.tsx";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const router = useRouter(); // <-- Initialize router

  const menuItems = [
    {
      id: "dashboard",
      icon: DashboardIcon,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      id: "analytics",
      icon: AnalyticsIcon,
      label: "Analytics",
      href: "/dashboard/analytics",
      isFuture: false,
    },
  ];
  const menuItems2 = [
    {
      id: "calendar",
      icon: CalanderIcon,
      label: "Calendar",
      href: "/dashboard/calendar",
    },
    {
      id: "slack",
      icon: SlackIcon,
      label: "Slack",
      href: "/dashboard/slack",
      isFuture: true,
    },
  ];

  const handleNavigation = (href: string, id: string) => {
    setActiveItem(id);
    router.push(href);
  };

  return (
    <div
      className={`transition-all duration-300 h-screen w-[320px] border-r border-[#D3D7D9] ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#D3D7D9]">
        {!isCollapsed && (
          <div className="text-xl font-bold">
            <Logo />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:border border-[] transition-colors"
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
                onClick={() => handleNavigation(item.href, item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeItem === item.id ? "bg-[#F5F5F5]" : "hover:outline"
                }
                ${!!item.isFuture ? " pointer-events-none" : ""}
                `}
              >
                <span
                  className={`flex ${
                    !!item.isFuture ? "opacity-45 pointer-events-none" : ""
                  }`}
                >
                  <item.icon />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </span>
                {item.isFuture && (
                  <span className="text-[12px] bg-[#DDE6FC] px-2 py-0.5 rounded-2xl ml-auto text-[#304EDE]">
                    Coming Soon
                  </span>
                )}
              </button>
            </li>
          ))}
          <span className=" text-[#8A8A8A]">Integrations</span>
          {menuItems2.map((item) => (
            <li key={item.id}>
              <button
                // onClick={() => handleNavigation(item.href, item.id)}
                className="flex items-center w-full p-3 rounded-lg transition-colors1"
                //  ${
                //     activeItem === item.id ? "bg-[#F5F5F5]" : "hover:outline"
                //   }
                // ${!!item.isFuture ? " pointer-events-none" : ""}
                // `}
              >
                <span
                  className={`flex ${
                    !!item.isFuture ? "opacity-45 pointer-events-none" : ""
                  }`}
                >
                  <item.icon />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </span>
                {item.isFuture && (
                  <span className="text-[12px] bg-[#DDE6FC] px-2 py-0.5 rounded-2xl ml-auto text-[#304EDE]">
                    Coming Soon
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#D3D7D9]">
        <button className="flex items-center w-full p-3 rounded-lg hover:border border-[] transition-colors">
          {/* <LogOut size={20} /> */}
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}
