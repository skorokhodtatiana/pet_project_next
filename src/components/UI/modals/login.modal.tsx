"use client";

import CustomModal from "../../common/modal";
import LoginForm from "@/src/forms/login.form";

interface IProps {
	isOpen: boolean,
	onClose: () => void
}
const LoginModal = ({
	isOpen,
	onClose
}: IProps) => {
	return (
		<>
			<CustomModal isOpen={isOpen} onClose={onClose} title="Войти в аккаунт">
				<LoginForm onClose={onClose}></LoginForm>
			</CustomModal>
		</>
	);
}

export default LoginModal;
