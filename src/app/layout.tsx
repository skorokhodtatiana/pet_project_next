import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/UI/header";
import { Providers } from "../providers/provider";
import { siteConfig } from "../config/site.config";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default function RootLayout({
		children,
		}: Readonly<{
		children: React.ReactNode;
	}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					<Header/>
					<main className="flex flex-col h-[calc(100vh_-_80px_-_60px)] w-full justify-start items-center">
						{children}
					</main>
					<footer className="flex h-[80px] justify-center items-center">
						<p>{siteConfig.description}</p>
					</footer>
				</Providers>
			</body>
		</html>
	);
}
