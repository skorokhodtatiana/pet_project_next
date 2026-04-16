import { IIngridient } from './ingridient';

export interface IrecipeIngridient {
	id: string,
	ingredientId: string,
	quantity: number,
	ingredient: IIngridient
}

export interface IRecipe {
	id: string,
	name: string,
	description: string,
	imageUrl?: string | null,
	ingredients: IrecipeIngridient[]
}
