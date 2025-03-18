import Footer from "@/components/globals/Footer";
import Header from "@/components/globals/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hacker News",
  description:
    "Stay updated with the latest tech news, programming trends, and startup stories on Hacker News.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full bg-[#F7F7F7] min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
