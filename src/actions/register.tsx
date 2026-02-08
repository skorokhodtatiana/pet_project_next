"use server"

import { IFornData } from "../types/form-data";
import { prisma } from "../utils/prisma";

export async function registerUser (formData:IFornData) {
	const { email, password, confirmPassword } = formData;

	try {
		const user = await prisma.user.create({
			data: {
				email: email,
				password: password
			}
		})
		console.log("User ", user)
		return user;
	} catch(error) {
		console.log(error)
		return {error: 'Ошибка при регистрации'}
	}
}
