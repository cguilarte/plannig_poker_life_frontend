/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, ModalProps, Divider, Input, ModalFooter, Button } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "@/infrastructure/hooks/useAlert";
import { HiOutlineSelector } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/login/core/infrastructure/redux";
import { repositoryTeam } from "../../infrastructure/repository";
import { FormDataCreateTeam } from "../../domain/interfaces";
import { schemaValidateCreateTeam } from "../../domain/validateSchema";

export default function ModalEdit({ teamId, isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

	const user: any = useSelector(selectUser);
	const { alertSuccess } = useAlert();

	const { modelUpdate, loading } = repositoryTeam.updateTeam(onSuccess);

	const { modelDetail, data, loading: loadingDetail } = repositoryTeam.detailTeam()

	const { handleSubmit, control, setError, setValue, formState: { errors } } = useForm<FormDataCreateTeam>({
		resolver: yupResolver(schemaValidateCreateTeam),
		defaultValues: {
			name: ''
		}
	});

	function onSuccess(result: any) {
		if (result) {
			alertSuccess('Team actualizada con éxito.')
			onOpenChange();
		}
	}

	const onSubmit = async (team: any) => {
		modelUpdate({
			variables: {
				data: team,
				teamId: data.detailTeam._id
			}
		});
	}


	useEffect(() => {
		modelDetail({
			variables: {
				teamId: teamId
			}
		})
	}, []);


	useEffect(() => {
		if (data) {
			const { detailTeam: row } = data;
			setValue('name', row.name);
		}
	}, [data]);

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
									<h2 className='font-bold text-base'>Editar team</h2>
									<p className='text-xs text-secondary-400 dark:text-white/80'>Editar cuenta de team.</p>
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
									Actualizar
								</Button>
							</ModalFooter>

						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
