import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";

interface IProps {
	onClose: () => void
}

const RegistrationForm = ({onClose}: IProps) => {
	const [formData, setFormData] =useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	const onSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted", formData)
		onClose();
	}

	return (
		<Form className="w-full max-w-xs" onSubmit={onSubmit}>
			<Input
				isRequired
				errorMessage="Please enter a valid email"
				aria-label="Email"
				name="email"
				placeholder="Введите email"
				type="email"
				value={formData.email}
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, email: e.target.value})}
				validate={(value) => {
					if(!value) return "Почта обязательна";
					if(!validateEmail(value)) return "Некорректный email";
					return null;
				}}
			/>
			
		{/* <Button type="submit" variant="bordered">
			Отправить
		</Button>
		{submitted && (
			<div className="text-small text-default-500">
			You submitted: <code>{JSON.stringify(submitted)}</code>
		</div>
		)} */}
		</Form>
	)
}

export default RegistrationForm;
