'use client'

import { useSession } from "next-auth/react";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { useIngridientStore } from "../store/ingridient.store";
import { useRecipeStore } from "../store/recipe.store";

interface IProps {
	children: React.ReactNode;
}

const AppLoader = ({children}: IProps) => {
	const { data: session, status } = useSession();
	const { isAuth, setAuthState } = useAuthStore();
	const { loadIngridient } = useIngridientStore();
	const { loadingRecipes } = useRecipeStore();

	useEffect(() => {
		setAuthState(status, session);
	},[status, session, setAuthState]);

	useEffect(() => {
		if (isAuth) {
			loadIngridient();
		}
	}, [isAuth, loadIngridient]);

	useEffect(() => {
		loadingRecipes();
	}, [loadingRecipes]);

	return(
		<>{children}</>
	)
}

export default AppLoader;
