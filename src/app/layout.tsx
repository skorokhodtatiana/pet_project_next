import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/UI/layouts/header";
import { Providers } from "../providers/provider";
import { siteConfig } from "../config/site.config";
import { layoutConfig } from "../config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth/auth";
import AppLoader from "../hoc/app-loader";
import TitlePage from "../components/UI/layouts/title";

import './globals.css';

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
							<div className="flex min-h-screen flex-col justify-between">
								<Header/>
								<main
									className={`flex flex-col max-w-5xl mx-auto px-6 justify-start items-center`}
									style={{height: `calc(100vh - ${layoutConfig.footerHight} - ${layoutConfig.headerHight})`}}
								>
									<TitlePage />
									{children}
								</main>
								<footer
									className={`flex  justify-center items-center`}
									style={{
										height: `${layoutConfig.footerHight}`
									}}
								>
									<p>{siteConfig.description}</p>
								</footer>
							</div>
						</AppLoader>
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}
