import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Client Discovery | Illuminate Technologies",
  description: "Tell us about your business and the digital solution you have in mind."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
