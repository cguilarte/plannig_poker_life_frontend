import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalProps } from "@nextui-org/react";
import { BsArrowRightShort, BsCheckCircleFill } from "react-icons/bs";
import { TypePlanning } from "../../domain/planningData";
import { TTypePlanning } from "../../domain/interfaces";
import { TfiControlShuffle } from 'react-icons/tfi';
import { useRouter } from "next/navigation";
import { LiaJira } from 'react-icons/lia';

export default function ModalTypePlanning({ isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");
	const [optionSelect, setOptionSelect] = useState<TTypePlanning | null>(null);
	const router = useRouter();


	const urlCreatePlanning = () => {
		if (optionSelect === TypePlanning.MANUAL) router.push('/plannings/create?type=manual');
		if (optionSelect === TypePlanning.JIRA) window.location.href = `${process.env.NEXT_PUBLIC_JIRA_URL_INTEGRATION}`;
	}

	return (
		<>
			<Modal
				size="sm"
				backdrop="blur"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Seleccione el tipo de integración</ModalHeader>
							<ModalBody>
								<div className="grid grid-cols-1 gap-4 items-center">
									<div
										className={`rounded-lg relative bg-primary-100 flex flex-col p-4 cursor-pointer border-solid border-2  ${optionSelect === TypePlanning.MANUAL ? '!border-green-600' : ''} border-transparent hover:border-slate-500 transition-all`}
										onClick={() => {
											router.push('/plannings/create?type=manual')
										}}
									>
										{optionSelect === TypePlanning.MANUAL && <BsCheckCircleFill className="absolute right-2 top-4 text-base text-green-600" />}
										<strong className="text-base font-bold text-secondary uppercase flex items-center mb-1"><TfiControlShuffle className=" text-lg mr-2" />{TypePlanning.MANUAL}</strong>
										<p className=" text-xs text-secondary-400">Crea tus propios tickets sin integrar plataformas externas</p>
									</div>
									<div
										className={`rounded-lg relative bg-primary-100 flex flex-col p-4 cursor-pointer  ${optionSelect === TypePlanning.JIRA ? '!border-green-600' : ''}  border-solid border-2 border-transparent hover:border-slate-500 transition-all`}
										onClick={() => {
											window.location.href = `${process.env.NEXT_PUBLIC_JIRA_URL_INTEGRATION}`;
										}}
									>
										{optionSelect === TypePlanning.JIRA && <BsCheckCircleFill className="absolute right-2 top-4 text-base text-green-600" />}
										<strong className="text-base font-bold text-secondary uppercase flex items-center mb-1"><LiaJira className=" text-lg mr-2" /> {TypePlanning.JIRA}</strong>
										<p className=" text-xs text-secondary-400">Conecta tu proyecto Atlassian Jira e importa tareas en unos pocos clics.</p>
									</div>
								</div>
							</ModalBody>

						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
