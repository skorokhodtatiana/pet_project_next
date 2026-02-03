"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/src/config/site.config";
import { layoutConfig } from "@/src/config/layout.config";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";

export const Logo = () => {
	return (
		<Image
			src="/food-logo.png"
			alt={siteConfig.title}
			width={26} height={26}
			priority
		/>
	);
};

export default function Header() {
	const pathname = usePathname();

	const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const getNavItems = () => {
		return (
			siteConfig.navItems.map(item => {
				const isActive = pathname === item.href;
				return <NavbarItem key={item.href}>
					<Link
						color="foreground"
						href={item.href}
						className={`px-3 py-1
							${isActive ? "text-blue-500" : "text-foreground"}
							hover: text-blue-300 hover:border
							hover: text-blue-300 hover:rounded-md
							transition-colors
							transition-border
							duration-200`}
						>
						{item.label}
					</Link>
				</NavbarItem>
			})
		)
	}

	return (
		<Navbar
			style={{
				height: `${layoutConfig.headerHight}`
			}}>
			<NavbarBrand>
				<Link href="/" className="flex gap-1">
					<Logo />
					<p className="font-bold text-inherit">{siteConfig.title}</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{getNavItems()}
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
				</NavbarItem>
				<NavbarItem>
					<Button onPress={() => setIsRegistrationModalOpen(true)} as={Link} color="primary" href="#" variant="flat">
						Регистрация
					</Button>
					<Button onPress={() => setIsLoginModalOpen(true)} as={Link} color="primary" href="#" variant="flat">
						Войти
					</Button>
				</NavbarItem>
			</NavbarContent>

			<RegistrationModal onClose={() => setIsLoginModalOpen(false)} isOpen={isRegistrationModalOpen}></RegistrationModal>
			<LoginModal onClose={() => setIsLoginModalOpen(false)} isOpen={isLoginModalOpen}></LoginModal>
		</Navbar>
	);
}
