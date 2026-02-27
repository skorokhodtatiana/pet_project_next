'use client'

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../constans/select-options";

const IngridientForm = () => {
	const[formData, setFormData] = useState({
		name: '',
		category: '',
		unit: '',
		pricePerUnit: null as number | null,
		description: ''
	})

	const handleSubmit = (e:React.FormEvent) => {
		e.preventDefault();
		console.log('formData', formData)
	}

	return (
		<Form className="w-[400px]" onSubmit={handleSubmit}>
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
				<Button className="flex w-full items-center justify-end">
					Добавить ингридиент
				</Button>
			</div>
		</Form>
	)
}

export default IngridientForm;
