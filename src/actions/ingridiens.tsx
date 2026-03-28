'use server';

import { ingridientShema } from "@/src/shema/zod";
import { prisma } from "@/src/utils/prisma";
import { ZodError } from "zod";

export async function createIngridient(formData: FormData) {
	try {
		const data = {
			name: formData.get('name') as string,
			category: formData.get('category') as string,
			unit: formData.get('unit') as string,
			pricePerUnit: formData.get('pricePerUnit') ? parseFloat(formData.get('pricePerUnit') as string) : null,
			description: formData.get('description') as string
		}
		const validateData = ingridientShema.parse(data);

		const ingridient = await prisma.ingridient.create({
			data: {
				name: validateData.name,
				category: validateData.category,
				unit: validateData.unit,
				pricePerUnit: validateData.pricePerUnit,
				description: validateData.description
			}
		})
		return { success: true, ingridient}
	} catch (error) {
		if (error instanceof ZodError) {
			return {error: error.message}
		}
		console.log('error', error)
		return {error: "Ошибка при создании ингридиента"}
	}
}

export async function getIngridients() {
	try {
		const ingridients = await prisma.ingridient.findMany();

		return { success: true, ingridients }
	} catch (error) {
		console.log( 'Ошибка при получении ингридиентов: ', error)
		return { error: 'Ошибка при получении ингридиентов'}
	}
}

export async function deleteIngridient(id: string) {
	try {
		const ingridient = await prisma.ingridient.delete({
			where: {id}
		})

		return {success: true, ingridient}
	} catch (error) {
		console.log( 'Ошибка при удалении ингридиента: ', error)
		return { error: 'Ошибка при удалении ингридиента'}
	}
}
