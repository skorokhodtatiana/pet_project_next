"use server"

import { signOut } from "../auth/auth";

export async function signOutfunc() {
	try {
		const result = await signOut({
			redirect: false
		})
		console.log('result', result)
		return result;
	} catch (error) {
		console.log('Ошибка авторизации', error);
		throw error;
	}
}