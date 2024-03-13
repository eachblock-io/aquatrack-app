import React from "react";
import { Sidenav } from "@/components/Sidenav";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden">
      <Sidenav />
      <main className="w-full relative overflow-y-auto">
        {/* <Header data={data} /> */}
        {children}
      </main>
    </section>
  );
};

export default Layout;
