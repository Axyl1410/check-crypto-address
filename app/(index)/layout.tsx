import { Providers } from "@/components/provider";
import FooterSection from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <div className="container mx-auto">{children}</div>
      <FooterSection />
    </Providers>
  );
}
