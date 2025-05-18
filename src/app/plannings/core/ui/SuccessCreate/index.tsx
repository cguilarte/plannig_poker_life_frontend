import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalProps, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import Image from "next/legacy/image";
import { CgCopy } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { HiOutlineExternalLink } from "react-icons/hi";
import { GoCopy } from "react-icons/go";
import { copyLink } from "../../infrastructure/utils";
import useAlert from "@/infrastructure/hooks/useAlert";
import { ROUTER } from "@/infrastructure/constants";


export default function SuccessCreate({ planningId, isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");
	const { alertSuccess } = useAlert();
	const router = useRouter();
	return (
		<>
			<Modal
				size="md"
				backdrop="blur"
				isOpen={isOpen}
				isDismissable={false}
				isKeyboardDismissDisabled={true}
				hideCloseButton={true}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>
								<div className="flex flex-col items-center justify-center relative">
									<div className=" w-72 h-60 relative">
										<Image src="/img/confirmed-document.svg" objectFit='cover' layout="fill" alt="Planning create" />
									</div>
									<div className="text-center mb-4 flex flex-col flex-grow items-center justify-center">
										<h2 className=" font-bold text-2xl">Planning creada con éxito.</h2>
										<div className="flex items-center gap-4 mt-4">
											<Dropdown>
												<DropdownTrigger>
													<Button size="sm" variant='flat' radius='full' className='cursor-pointer text-xs capitalize underline text-primary'>Planning ID</Button>
												</DropdownTrigger>
												<DropdownMenu
													variant="flat"
													aria-label="Dropdown menu with shortcut"
													onAction={(key) => {
														if (key === 'copy') copyLink(`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${planningId}`).then(() => alertSuccess('Url copiado con exito.'))
													}}
												>
													<DropdownItem key="link" startContent={<HiOutlineExternalLink />}><Link isExternal showAnchorIcon size='sm' href={`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${planningId}`}>Ir a planning live</Link></DropdownItem>
													<DropdownItem key="copy" startContent={<GoCopy />}>Copiar link para compartir</DropdownItem>
												</DropdownMenu>
											</Dropdown>

											<Button size="sm" onClick={() => router.push('/plannings')} color="primary" variant="ghost" fullWidth={false}>Ir al listado de planning</Button>
										</div>
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
