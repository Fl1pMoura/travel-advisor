import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Image
          src={
            "https://cdn.prod.website-files.com/66c801a90927982031cf8b79/66c8068d222a71f67f53b367_bg-p-1600.png"
          }
          alt="bg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          fill
          quality={100}
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ zIndex: -1 }}
          unoptimized
        />
      </body>
    </html>
  );
}
