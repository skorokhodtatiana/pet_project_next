import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";


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
		</Form>
	)
}

export default IngridientForm;
