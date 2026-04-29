"use client"

import Link from "next/link";
import { useRecipeStore } from "../store/recipe.store";
import { Button } from "@heroui/react";
import RecipeCard from "../components/common/recipe-card";

export default function Home() {
	const { recipes, isLoading, error } = useRecipeStore();

	return (
		<div className="flex">
			<div className="flex w-full justify-center items-center mb-4">
				<Link href="/recipes/new">
					<Button color="primary">Добавить рецепт</Button>
				</Link>
			</div>

			{error && <p className="text-red-500 mt-4">{error}</p>}

			{isLoading && <p>...Загрузка</p>}

			{recipes.map(recipe => (
				<RecipeCard key={recipe.id} recipe={recipe}/>
			))}
		</div>
	);
}
