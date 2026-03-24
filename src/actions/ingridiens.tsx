'use server';

import { ingridientShema } from "@/src/shema/zod";
import { prisma } from "@/src/utils/prisma";
import { ZodError } from "zod";

export async function createIngridient(formData: FormData) {
	try {
		console.log('formData', formData)
		const data = {
			name: formData.get('name') as string,
			category: formData.get('category') as string,
			unit: formData.get('unit') as string,
			pricePerUnit: formData.get('pricePerUnit') ? formData.get('pricePerUnit') as string : null,
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
			return {error: error}
		}
		console.log('error', error)
		return {error: "Ошибка при создании ингридиента"}
	}
}
