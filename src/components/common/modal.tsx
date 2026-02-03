"use client"

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
	isOpen: boolean,
	onClose: () => void,
	title: string,
	children: ReactNode,
	size?: "xs" | "sm" | "md" | "lg" |"xl";
}

const CustomModal = ({
	isOpen,
	onClose,
	children,
	title,
	size = "xs"
}:IProps) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={size}>
				<ModalContent>
					<ModalHeader className="border-b">
						<h1 className="text-xl text-background font-semibold">{title}</h1>
					</ModalHeader>
					<ModalBody className="space-y-4 py-6">
						{children}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CustomModal;
