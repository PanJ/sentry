"use client";

import  { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { PrimaryButton, SecondaryButton } from "../buttons/ButtonsComponent";
import { ReactNode } from "react";

interface ModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
	onSuccess: (onClose: () => void) => void;
	modalBody: ReactNode;
	modalHeader: ReactNode;
	cancelBtnText: string;
	confirmBtnText: string;
}

export const ModalComponent = ({
	isOpen, onOpenChange, onSuccess, modalBody, modalHeader, cancelBtnText, confirmBtnText
}: ModalProps) => {
  return (
	<Modal size="xl" radius="sm" isOpen={isOpen} onOpenChange={onOpenChange} className="sm:w-full sm:mx-0">
	<ModalContent>
	{(onClose) => (
		<>
		<ModalHeader className="flex flex-col gap-1">{modalHeader}</ModalHeader>
		<ModalBody>
			{modalBody}
		</ModalBody>
		<ModalFooter>
			<SecondaryButton
				btnText={cancelBtnText}
				className="bg-white"
				onClick={onClose}
			/>
			<PrimaryButton
				btnText={confirmBtnText}
				onClick={() => onSuccess(onClose)}
			/>
		</ModalFooter>
		</>
	)}
	</ModalContent>
</Modal>
  );
};
