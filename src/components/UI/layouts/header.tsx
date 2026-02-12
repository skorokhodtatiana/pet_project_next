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
import { signOutfunc } from "@/src/actions/sign-out";
import { useAuthStore } from "@/src/store/auth.store";

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

	const {isAuth, status, session, setAuthState} = useAuthStore();

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

	const handleSignOut = async () => {
		try {
			await signOutfunc();
		} catch (error) {
			console.log('error', error)
		}

		setAuthState('unauthenticated', null);
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

			{status === 'loading' ? <p>Загрузка...</p> :
				<NavbarContent justify="end">
					{isAuth && <p>Привет, {session?.user?.email}!</p>}
					{!isAuth ?
						<NavbarItem className="hidden lg:flex">
							<Button onPress={() => setIsRegistrationModalOpen(true)} as={Link} color="primary" href="#" variant="flat">
								Регистрация
							</Button>
							<Button onPress={() => setIsLoginModalOpen(true)} as={Link} color="primary" href="#" variant="flat">
								Логин
							</Button>
						</NavbarItem>
						:
						<NavbarItem className="hidden lg:flex">
							<Button onPress={handleSignOut} as={Link} color="primary" href="#" variant="flat">
								Выйти
							</Button>
						</NavbarItem>
					}
				</NavbarContent>
			}

			<RegistrationModal onClose={() => setIsRegistrationModalOpen(false)} isOpen={isRegistrationModalOpen}></RegistrationModal>
			<LoginModal onClose={() => setIsLoginModalOpen(false)} isOpen={isLoginModalOpen}></LoginModal>
		</Navbar>
	);
}
