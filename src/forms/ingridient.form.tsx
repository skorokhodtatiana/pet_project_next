'use client'

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../constans/select-options";
import { useIngridientStore } from "../store/ingridient.store";

const initialState = {
		name: '',
		category: '',
		unit: '',
		pricePerUnit: null as number | null,
		description: ''
	}

const IngridientForm = () => {
	const [error, setError] = useState<string | null>(null)
	const[formData, setFormData] = useState(initialState)
	const [isPending, startTransition] = useTransition();
	const {addIngridient} = useIngridientStore();

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			await addIngridient(formData);

			const storeError = useIngridientStore.getState().error;

			if (storeError) {
				setError(storeError);
			} else {
				setError(null);
				setFormData(initialState);
			}
		})
	}

	return (
		<Form className="w-full" action={handleSubmit}>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<Input
				isRequired
				name="name"
				placeholder="Введите название ингридиента"
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
			<div className="flex gap-2 w-full">
				<div className="w-1/3">
					<Select
						isRequired
						name="category"
						placeholder="Категория"
						aria-label="category"
						selectedKeys={formData.category ? [formData.category] : []}
						classNames={{
							trigger: "bg-default-100 w-full",
							innerWrapper: "text-sm",
							value: "truncate",
							selectorIcon: "text-black"
						}}
						onChange={(e) => setFormData({...formData, category: e.target.value})}
					>
						{CATEGORY_OPTIONS.map((category) => (
							<SelectItem className="text-black" key={category.value}>{category.label}</SelectItem>
						))}
					</Select>
				</div>
				<div className="w-1/3">
					<Select
						isRequired
						name="unit"
						placeholder="Ед. изм."
						aria-label="unit"
						selectedKeys={formData.unit ? [formData.unit] : []}
						classNames={{
							trigger: "bg-default-100 w-full",
							innerWrapper: "text-sm",
							value: "truncate",
							selectorIcon: "text-black"
						}}
						onChange={(e) => setFormData({...formData, unit: e.target.value})}
					>
						{UNIT_OPTIONS.map((unit) => (
							<SelectItem className="text-black" key={unit.value}>{unit.label}</SelectItem>
						))}
					</Select>
				</div>
				<div className="w-1/3">
					<Input
						isRequired
						name="pricePerUnit"
						placeholder="Цена"
						type="number"
						value={
							formData.pricePerUnit !== null
								? formData.pricePerUnit.toString()
								: ""
						}
						onChange={(e) => {
							const value = e.target.value ? parseFloat(e.target.value) : null;
							setFormData({...formData, pricePerUnit: value})
						}}
					/>
				</div>
			</div>
			<Input
				name="description"
				value={formData.description}
				type="text"
				placeholder="Введите описание(необязательно)"
				classNames={{
					inputWrapper:"bg-default-100",
					input:"text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, description: e.target.value})}
			/>
			<div className="flex w-full items-center justify-end">
				<Button color="primary" type="submit" isLoading={isPending}>
					Добавить ингридиент
				</Button>
			</div>
		</Form>
	)
}

export default IngridientForm;
