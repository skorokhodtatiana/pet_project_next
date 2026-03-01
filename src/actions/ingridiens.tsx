'use server';

export async function createIngridient(formData: FormData) {
	try {
		console.log('formData', formData)
	} catch (error) {
		console.log('error', error)
		return {error: "Ошибка при создании ингридиента"}
	}
}
