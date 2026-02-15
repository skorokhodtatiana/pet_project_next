"use client";

import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";
import { signInWithCredentionals } from "../actions/sign-in";

interface IProps {
	onClose: () => void
}

const LoginForm = ({onClose}: IProps) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted", formData)
		await signInWithCredentionals(formData.email, formData.password);

		window.location.reload()
		onClose();
	}

	return (
		<Form className="w-full max-w-xs" onSubmit={handleSubmit}>
			<Input
				isRequired
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
					return null;
				}}
			/>
			<Input
				isRequired
				aria-label="password"
				name="password"
				placeholder="Введите пароль"
				type="password"
				value={formData.password}
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm focus:outline-none"
				}}
				onChange={(e) => setFormData({...formData, password: e.target.value})}
				validate={(value) => {
					if(!value) return "пароль обязательна";
					return null;
				}}
			/>
			<div className="flex w-[100%] gap-4 items-center pt-88 justify-end">
				<Button onPress={onClose} variant="light">
					Отмена
				</Button>
				<Button type="submit" color="primary">
					Войти
				</Button>
			</div>
		</Form>
	)
}

export default LoginForm;
