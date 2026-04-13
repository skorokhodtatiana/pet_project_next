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
		return {success: true, recipes}
	} catch (error) {
		console.log('error', error)
		return {success: false, error: "Ошибка при загрузке рецептов"}
	}
}
