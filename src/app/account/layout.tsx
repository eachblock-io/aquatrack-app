import Layout from "@/components/Layout";
import { Providers } from "@/redux/providers";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
