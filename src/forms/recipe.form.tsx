"use client";

import { useState, useTransition } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useIngridientStore } from "../store/ingridient.store";
import { useRecipeStore } from "../store/recipe.store";
import { IRecipe } from "../types/recipe";
import { useRouter } from "next/navigation";

interface RecipeFormProps {
	initialRecipe?: IRecipe
}

interface IIngridientField {
	id: number,
	ingridientId: string,
	quantity: number | null,
}

const initialState = {
	name: "",
	description: "",
	imageUrl: ""
}

const RecipeForm = ({initialRecipe}: RecipeFormProps) => {
	const [error, setError] = useState<string | null>(null);

	const [formData, setFormData] =useState({
		name: initialRecipe?.name || initialState.name,
		description: initialRecipe?.description || initialState.description,
		imageUrl: initialRecipe?.imageUrl || initialState.imageUrl
	});

	const [ingridientField, setIngridientField] = useState<IIngridientField[]>(
		initialRecipe?.ingredients
			? initialRecipe?.ingredients.map((ing, index) => ({
				id: index,
				ingridientId: ing.ingredientId,
				quantity: ing.quantity
			}))
			: [{id: 0, ingridientId: "", quantity: null}]
	);

	const { ingridients } = useIngridientStore();
	const { addRecipe, updateRecipe} = useRecipeStore();
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const handleAddIngridientField = () => {
		if (ingridientField.length < 10) {
			setIngridientField([
				...ingridientField,
				{id: ingridientField.length, ingridientId: "", quantity: null}
			])
		}
	}

	const handleRemoveIngridientField = (id: number) => {
		if (ingridientField.length > 1) {
			setIngridientField(ingridientField.filter((field) => field.id !== id))
		}
	}

	const handleIngridientChange = (
		id: number,
		field: keyof IIngridientField,
		value: string | number | null
	) => {
		console.log("ingridientField ", ingridientField);
		ingridientField.map(f => console.log("f ", f))
		setIngridientField(
			ingridientField.map((f) => (
				f.id === id ? {...f, [field]: value} : f
			))
		);
	};

	const handleSubmit = async (formData: FormData) => {
		startTransition(async() => {
			setError(null);

			const result = initialRecipe
				? await updateRecipe(initialRecipe.id, formData)
				: await addRecipe(formData);

			if (result.success) {
				setIngridientField([{id: 0, ingridientId: "", quantity: null}]);
				router.push("/");
				setFormData(initialState);
			} else {
				setError(result.error || "Ошибка при сохранении рецепта");
			}
		});
	};

	return (
		<Form className="w-112.5" action={handleSubmit}>
			{error && <p className="text-red-500 mb-4">{error}</p>}

			<Input
				isRequired
				name="name"
				placeholder="Введите название рецепта"
				type="text"
				value={formData.name}
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, name: e.target.value})}
				validate={(value) => {
					if(!value) return "Название обязательно";
					return null;
				}}
			/>

			<Input
				name="description"
				placeholder="Введите описание (необязательно)"
				type="text"
				value={formData.description}
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, description: e.target.value})}
			/>

			<Input
				name="imageUrl"
				placeholder="URL изображения (необязательно)"
				type="text"
				value={formData.imageUrl}
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
			/>

			<div className="space-y-2 w-full">
				{ingridientField.map((field, index) => (
					<div key={field.id} className="flex gap-2 items-center">
						<Select
							isRequired
							name={`ingridient_${index}`}
							placeholder="Выберите ингридиент"
							aria-label="category"
							selectedKeys={field.ingridientId ? [field.ingridientId] : []}
							classNames={{
								trigger: "bg-default-100 w-full",
								innerWrapper: "text-sm",
								value: "truncate",
								selectorIcon: "text-black"
							}}
							onChange={(e) => handleIngridientChange(field.id, "ingridientId", e.target.value)}
						>
							{ingridients.map((ingridient) => (
								<SelectItem className="text-black" key={ingridient.id}>
									{ingridient.name}
								</SelectItem>
							))}
						</Select>
						<Input
							isRequired
							name={`quantity_${index}`}
							placeholder="Количество"
							type="number"
							value={field.quantity ? field.quantity.toString() : ""}
							classNames={{
								inputWrapper: "bg-default-100 w-full",
								input: "text-sm focus:outline-none"
							}}
							className="w-25"
							onChange={(e) => handleIngridientChange(field.id, "quantity", e.target.value ? parseFloat(e.target.value) : null)}
							validate={(value) => 
								!value || parseFloat(value) <= 0
									? "Количество должно быть больше 0"
									: null
							}
						/>
						{ingridients.length > 1 && (
							<Button
								color="danger" 
								variant="light"
								onPress={() => handleRemoveIngridientField(field.id)}
								className="w-[50px"
							>
								-
							</Button>
						)}
					</div>
				))}

				{ingridients.length < 10 && (
					<Button
						color="primary" 
						variant="flat"
						onPress={handleAddIngridientField}
						className="w-12.5"
					>
						+
					</Button>
				)}
			</div>

				<div className="flex w-full items-center justify-end mt-4">
				<Button color="primary" type="submit" isLoading={isPending}>
					{initialRecipe ? "Сохранить изменение" : "Добавить рецепт"}
				</Button>
			</div>
		</Form>
	)
}

export default RecipeForm;
