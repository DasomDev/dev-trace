import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        <nav className="w-[280px] h-full bg-blue-100">hi</nav>
        {children}
      </main>
    </div>
  );
};
