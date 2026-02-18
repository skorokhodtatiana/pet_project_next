import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/UI/layouts/header";
import { Providers } from "../providers/provider";
import { siteConfig } from "../config/site.config";
import { layoutConfig } from "../config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth/auth";
import AppLoader from "../hoc/app-loader";
import TitlePage from "../components/UI/layouts/title";

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

export default async function RootLayout({
		children,
		}: Readonly<{
		children: React.ReactNode;
	}>) {
		const session = await auth();
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					<SessionProvider session={session}>
						<AppLoader>
							<Header/>
							<TitlePage/>
							<main className={`flex flex-col h-[calc(100vh_-_${layoutConfig.footerHight}_-_${layoutConfig.headerHight})] w-full justify-start items-center`}>
								{children}
							</main>
							<footer className={`h-[${layoutConfig.footerHight}] flex  justify-center items-center`}>
								<p>{siteConfig.description}</p>
							</footer>
						</AppLoader>
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
