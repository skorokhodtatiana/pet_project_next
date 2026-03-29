'use client'

import { useSession } from "next-auth/react";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { useIngridientStore } from "../store/ingridient.store";

interface IProps {
	children: React.ReactNode;
}

const AppLoader = ({children}: IProps) => {
	const {data: session, status} = useSession();
	const {isAuth, setAuthState} = useAuthStore();
	const {loadIngridient} = useIngridientStore();

	useEffect(() => {
		setAuthState(status, session);
	},[status, session, setAuthState])

	useEffect(() => {
		if (isAuth) {
			loadIngridient();
		}
	}, [isAuth, loadIngridient])

	return(
		<>{children}</>
	)
}

export default AppLoader;
