"use server"

import { signIn } from "../auth/auth";

export async function signInWithCredentionals(email: string, password: string) {
	try {
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false
		})
		return result;
	} catch (error) {
		console.log('Ошибка авторизации', error);
		throw error;
	}
}
