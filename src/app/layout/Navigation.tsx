import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/add", label: "Projects" },
  ];
  return (
    <nav className="border-r border-[#333333] shadow-sm w-[260px] p-6">
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 h-10 flex items-center rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-[#333333]"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
