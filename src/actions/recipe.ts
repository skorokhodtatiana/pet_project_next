'use server';

import { prisma } from "../utils/prisma";

export async function getRecipes() {
	try {
		const recipes = await prisma.recipe.findMany({
			include: {
				ingredients: {
					include: {
						ingredient: true
					}
				}
			}
		})
		return {success: true, recipes};
	} catch (error) {
		console.log('Error fetching recipes', error);
		return {success: false, error: "Ошибка при загрузке рецептов"};
	}
}

export async function createRecipes(formData: FormData) {
	try {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const imageUrl = formData.get("imageURL") as string | null;

		const ingridiense = Array.from(formData.entries())
			.filter(([key]) => key.startsWith('ingridiens_'))
			.map(([keyframes, value]) => ({
				ingredientId: value as string,
				quantity: parseFloat(
					formData.get(`quantity_${keyframes.split("_")[1]}`) as string
				)
			})
		)

		if (!name || ingridiense.length === 0) {
			return {success: false, error: "Имя и хотябы один ингридиент обязательны"};
		}

		const recipe = await prisma.recipe.create({
			data: {
				name,
				description,
				imageUrl,
				ingredients: {
					create: ingridiense.map(({ingredientId, quantity}) => ({
						ingredient: {connect: {id: ingredientId}},
						quantity
					}))
				}
			},
			include: {
				ingredients: {
					include: {
						ingredient: true
					}
				}
			}
		});

		return {success: true, recipe};
	} catch (error) {
		console.log('Error creating recipes', error);
		return {success: false, error: "Ошибка при создании рецепта"};
	}
}

export async function updateRecipes(id: string, formData: FormData) {
	try {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const imageUrl = formData.get("imageUrl") as string | null;

		const ingridiense = Array.from(formData.entries())
			.filter(([key]) => key.startsWith('ingridiens_'))
			.map(([keyframes, value]) => ({
				ingredientId: value as string,
				quantity: parseFloat(
					formData.get(`quantity_${keyframes.split("_")[1]}`) as string
				)
			})
		)

		if (!name || ingridiense.length === 0) {
			return {success: false, error: "Имя и хотябы один ингридиент обязательны"};
		}

		const recipe = await prisma.recipe.update({
			where: {id},
			data: {
				name,
				description,
				imageUrl,
				ingredients: {
					deleteMany: {},
					create: ingridiense.map(({ingredientId, quantity}) => ({
						ingredient: {connect: {id: ingredientId}},
						quantity
					}))
				}
			},
			include: {
				ingredients: {
					include: {
						ingredient: true
					}
				}
			}
		});

		return {success: true, recipe};
	} catch (error) {
		console.log('Error updating recipe', error);
		return {success: false, error: "Ошибка при обновлении рецепта"};
	}
}

export async function deleteRecipes(id: string) {
	try {
		await prisma.recipeIngridient.deleteMany({
			where: {recipeId: id}
		})

		await prisma.recipe.delete({
			where: {id}
		})

		return {success: true};
	} catch (error) {
		console.log('Error deleting recipe', error);
		return {success: false, error: "Ошибка при удалении рецепта"};
	}
}
