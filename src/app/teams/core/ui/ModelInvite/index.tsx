/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, ModalProps, Divider, ModalFooter, Button, Chip } from "@nextui-org/react";
import { repositoryTeam } from "../../infrastructure/repository";
import TagsInput from "@/components/TagsInput";
import LoadingInternal from "@/components/LoadingInternal";

export default function ModalInvite({ teamId, isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

	const [isError, setIsError] = useState(false);

	const [listEmails, setListEmail] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);
	const { data, loading } = repositoryTeam.listGuestTeam(teamId);

	const { modelAddInviteGuest, loading: loadingInvite } = repositoryTeam.addInviteGuest((result: any) => {
		setListEmail([]);
		setSuccess(true);
		setTimeout(() => {
			setSuccess(false);
		}, 1000);
	});

	const { modelDeleteGuest } = repositoryTeam.deleteGuestTeam((result: any) => {

	})


	const onSubmit = () => {
		if (listEmails.length === 0) {
			setIsError(true);
			return false;
		}

		modelAddInviteGuest({
			variables: {
				data: {
					guest: listEmails,
					status: 'P',
					teamId
				}
			}
		})
	}

	const handleDeleteEmail = (guestId: string) => {
		modelDeleteGuest({
			variables: {
				deleteGuestId: guestId
			}
		});
	}


	return (
		<>
			<Modal
				size="md"
				backdrop="blur"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>
								<div className=''>
									<h2 className='font-bold text-lg'>Lista de invitados</h2>
									<Divider orientation='horizontal' className='mt-2' />
								</div>

								<div className="flex flex-col w-full p-2 rounded-md relative">
									<TagsInput emails={data} setListEmail={setListEmail} reset={listEmails.length} />
								</div>

								<Divider orientation='horizontal' className='mb-2' />

								<div className="flex items-center space-x-4 mb-2">
									<div className="flex items-center text-xs text-black/70">
										<span className=" rounded-full h-2 w-2 bg-green-500 mr-1"></span> Verificado
									</div>
									<div className="flex items-center text-xs text-black/70">
										<span className=" rounded-full h-2 w-2 bg-warning-500 mr-1"></span> Pendiente
									</div>
								</div>

								<div className="w-full flex flex-wrap gap-3 pb-4">
									{loading && <LoadingInternal />}
									{data && data.map((item: any, index: number) => {
										return (
											<Chip key={index} onClose={() => handleDeleteEmail(item._id)} classNames={{ closeButton: 'hover:text-red-500 text-red-400', content: 'text-black/90' }} variant='bordered' color={`${item.status === 'P' ? 'warning' : 'success'}`}>{item.email}</Chip>
										)
									})}
								</div>

							</ModalBody>

							<ModalFooter className="flex items-center">
								{isError && <span className="text-red-600 text-xs">Ingrese por lo menos un email</span>}
								{success && <span className="text-green-600 text-xs">Invitación enviada.</span>}

								<Button color="primary" isDisabled={listEmails.length === 0} isLoading={loadingInvite} onPress={onSubmit}>
									Enviar invitación
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
