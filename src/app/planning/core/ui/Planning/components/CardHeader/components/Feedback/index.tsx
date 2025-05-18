import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Divider } from "@nextui-org/react";
import { VscFeedback } from "react-icons/vsc";
import Image from "next/image";
import { servicesPlanningLive } from "@/app/planning/core/infrastructure/services";
import { useAppSelector } from "@/infrastructure/hooks/store";
import { selectProfile } from "@/app/planning/core/infrastructure/redux";

import Lottie from "lottie-react";
import animated from "@/assets/animated/thumbs-up.json";



export default function Feedback({ isOpen, onOpenChange }: any) {
	const profile: any = useAppSelector(selectProfile);
	const [emoji, setEmoji] = useState<string | null>(null);
	const [comment, setComentario] = useState<string>('');
	const { createFeedback, loading } = servicesPlanningLive.feedback(onSuccess);
	const [success, setSuccess] = useState<boolean>(false);

	function onSuccess(data: any) {
		const { createFeedBack } = data;
		if (createFeedBack) {
			setEmoji(null);
			setComentario('');
			setSuccess(!success)
		}
	}

	const handleCreate = () => {
		createFeedback({
			variables: {
				data: {
					name: profile.name,
					email: profile.email,
					emoji,
					comment
				}
			}
		})
	}

	return (
		<>
			<Modal isOpen={isOpen} hideCloseButton={!success} onOpenChange={onOpenChange} backdrop='blur' className="dark:ring-4 dark:ring-default">
				<ModalContent>
					{(onClose) => (
						<>
							{success && <>
								<ModalBody className="p-4">
									<div className=" w-60 h-60 mx-auto">
										<Lottie animationData={animated} loop={true} />
									</div>
									<div className="flex flex-col items-center justify-center py-4">
										<h3 className="font-bold text-xl">Asombroso 😉</h3>
										<p className="text-secondary-400 font-normal text-base">Gracias {profile.name} por tus comentarios.</p>
									</div>
								</ModalBody>
							</>}

							{!success && <>
								<div className="w-full p-8 bg-primary relative flex items-center space-x-4">
									<VscFeedback className=" text-6xl text-white" />
									<div className="flex flex-col">
										<h2 className="text-white font-bold text-2xl">Envíanos tu opinión</h2>
										<p className="text-white text-xs font-normal">¿Tienes alguna sugerencia o has tenido algún problema? <br />
											háganoslo saber en los campos a continuación</p>
									</div>
								</div>
								<ModalBody>
									<div className="w-full p-4 flex items-center justify-center gap-8 my-4">

										<div onClick={() => setEmoji('terrible')} className={`flex flex-col justify-center items-center gap-1 cursor-pointer ${emoji !== 'terrible' ? 'opacity-60' : ''}`}>
											<div className={`rounded-full w-14 h-14 relative overflow-hidden ${emoji !== 'terrible' ? 'bg-secondary-100/50 dark:bg-default' : 'bg-[#FFD138]/50 '}  transition-all`}>
												<Image src="/img/emoji/terrible.svg" alt="terrible" objectFit='cover' layout='fill' className={`${emoji !== 'terrible' ? 'scale-80' : 'scale-100'}  transition-all`} />
											</div>
											<span className="text-xs text-secondary-400 font-bold dark:text-white">Terrible</span>
										</div>

										<div onClick={() => setEmoji('bad')} className={`flex flex-col justify-center items-center gap-1 cursor-pointer ${emoji !== 'bad' ? 'opacity-60' : ''}`}>
											<div className={`rounded-full w-14 h-14 relative overflow-hidden ${emoji !== 'bad' ? 'bg-secondary-100/50 dark:bg-default' : 'bg-[#FFD138]/50 '}  transition-all`}>
												<Image src="/img/emoji/bad.svg" alt="terrible" objectFit='cover' layout='fill' className={`${emoji !== 'bad' ? 'scale-80' : 'scale-100'}  transition-all`} />
											</div>
											<span className="text-xs text-secondary-400 font-bold dark:text-white">Malo</span>
										</div>

										<div onClick={() => setEmoji('good')} className={`flex flex-col justify-center items-center gap-1 cursor-pointer ${emoji !== 'good' ? 'opacity-60' : ''}`}>
											<div className={`rounded-full w-14 h-14 relative overflow-hidden ${emoji !== 'good' ? 'bg-secondary-100/50 dark:bg-default' : 'bg-[#FFD138]/50 '}  transition-all`}>
												<Image src="/img/emoji/good.svg" alt="terrible" objectFit='cover' layout='fill' className={`${emoji !== 'good' ? 'scale-80' : 'scale-100'}  transition-all`} />
											</div>
											<span className="text-xs text-secondary-400 font-bold dark:text-white">Bueno</span>
										</div>

										<div onClick={() => setEmoji('loved')} className={`flex flex-col justify-center items-center gap-1 cursor-pointer ${emoji !== 'loved' ? 'opacity-60' : ''}`}>
											<div className={`rounded-full w-14 h-14 relative overflow-hidden ${emoji !== 'loved' ? 'bg-secondary-100/50 dark:bg-default' : 'bg-[#FFD138]/50 '}  transition-all`}>
												<Image src="/img/emoji/loved.svg" alt="terrible" objectFit='cover' layout='fill' className={`${emoji !== 'loved' ? 'scale-80' : 'scale-100'}  transition-all`} />
											</div>
											<span className="text-xs text-secondary-400 font-bold dark:text-white">Me encanto</span>
										</div>

									</div>
									<Divider orientation='horizontal' className="mb-4" />

									<Textarea
										labelPlacement="outside"
										label="Por favor deje sus comentarios a continuación"
										className="w-full"
										disableAnimation
										variant="faded"
										minRows={6}
										onValueChange={(value: string) => setComentario(value)}
									/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cerrar
									</Button>
									<Button isLoading={loading} onClick={handleCreate} isDisabled={emoji === null && comment.length === 0} color="primary">
										Enviar comentario
									</Button>
								</ModalFooter>
							</>}
						</>
					)}
				</ModalContent>
			</Modal >
		</>
	);
}
