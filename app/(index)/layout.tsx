import { Providers } from "@/components/provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="container mx-auto">{children}</div>
    </Providers>
  );
}
