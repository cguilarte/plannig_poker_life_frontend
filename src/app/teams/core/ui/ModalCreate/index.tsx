import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, ModalProps, Divider, Input, ModalFooter, Button } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "@/infrastructure/hooks/useAlert";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/login/core/infrastructure/redux";
import { repositoryTeam } from "../../infrastructure/repository";
import { FormDataCreateTeam } from "../../domain/interfaces";
import { schemaValidateCreateTeam } from "../../domain/validateSchema";

export default function ModalCreate({ isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

	const user: any = useSelector(selectUser);
	const { alertSuccess } = useAlert();

	const { modelCreate, loading } = repositoryTeam.createTeam(onSuccess);

	const { handleSubmit, control, setError, formState: { errors } } = useForm<FormDataCreateTeam>({
		resolver: yupResolver(schemaValidateCreateTeam),
		defaultValues: {
			name: '',
		}
	});

	function onSuccess(data: any) {
		if (data) {
			alertSuccess('Team creada con éxito.')
			onOpenChange();
		}
	}

	const onSubmit = async (data: any) => {

		modelCreate({
			variables: {
				data
			}
		});

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
							<ModalBody>
								<div className=''>
									<h2 className='font-bold text-base'>Crear nuevo team</h2>
									<p className='text-xs text-secondary-400 dark:text-white/80'>Crear cuenta de team.</p>
									<Divider orientation='horizontal' className='my-2' />
								</div>

								<div className='w-full space-y-4'>
									<Controller
										control={control}
										name="name"
										rules={{
											required: true,
										}}
										render={({ field: { onChange, value } }) => (
											<Input
												label='Nombre del team'
												size='md'
												radius='sm'
												type='text'
												placeholder="Ingrese el nombre del team"
												labelPlacement="outside"
												value={value}
												onChange={onChange}
												isInvalid={errors.name ? true : false}
												errorMessage={errors.name?.message}
											/>
										)}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cerrar
								</Button>
								<Button color="primary" isLoading={loading} onClick={handleSubmit(onSubmit)}>
									Guardar
								</Button>
							</ModalFooter>

						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
