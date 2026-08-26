import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileSidebar } from "@/components/MobileSidebar";

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VedaAI - Exams",
  description: "AI Assessment Extraction & Answer Mapping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${bricolageGrotesque.className} h-full bg-[#f3f4f6] text-gray-900 overflow-hidden flex`}>
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <MobileSidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
