"use client";

import RegistrationForm from "@/src/forms/registration.form";
import CustomModal from "../../common/modal";

interface IProps {
	isOpen: boolean,
	onClose: () => void
}
const RegistrationModal = ({
	isOpen,
	onClose
}: IProps) => {
	return (
		<>
			<CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
				<RegistrationForm onClose={onClose}></RegistrationForm>
			</CustomModal>
		</>
	);
}

export default RegistrationModal;
