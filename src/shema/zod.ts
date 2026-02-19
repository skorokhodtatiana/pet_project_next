import { object, string } from "zod";

export const signInSchema = object({
	email: string({
		error: (issue) => {
			if (issue.input === undefined) {
				return "Поле email обязательно";
			}
			return "Некорректный тип данных";
		},
	})
		.min(1, "Email is required")
		.email("Invalid email"),
	password: string({
		error: (issue) => {
			if (issue.input === undefined) {
				return "Поле password обязательно";
			}
			return "Некорректный тип данных";
		},
	})
		.min(1, "Password is required")
		.min(6, "Password must be more than 6 characters")
		.max(32, "Password must be less than 32 characters"),
})
