import React from "react";
import { Sidenav } from "@/components/Sidenav";
import NavHeader from "./NavHeader";
import { MobileNav } from "./MobileNav";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden">
      <Sidenav />
      <main className="w-full relative overflow-y-auto">
        <NavHeader />
        {children}
      </main>
    </section>
  );
};

export default Layout;
