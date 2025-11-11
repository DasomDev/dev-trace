import { Link, useLocation } from "react-router-dom";
import { LayoutDashboardIcon, PlusIcon } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "projects", icon: <LayoutDashboardIcon className="w-4 h-4" /> },
    { path: "/add", label: "New Task", icon: <PlusIcon className="w-4 h-4" /> },
  ];
  return (
    <nav className="border-r border-[#333333] shadow-sm w-[260px] p-6">
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 h-10 flex items-center gap-1 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path ? "bg-[#333333]" : ""
            }`}
          >
            
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
