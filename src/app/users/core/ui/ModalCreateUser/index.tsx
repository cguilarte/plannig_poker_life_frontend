import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, ModalProps, Divider, Input, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";
import { repositoryUser } from "../../infrastructure/repository";
import { FormDataCreateUser } from "../../domain/interfaces";
import { Controller, useForm } from "react-hook-form";
import { schemaValidateCreateUser } from "../../domain/validateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAlert from "@/infrastructure/hooks/useAlert";
import { HiOutlineSelector } from "react-icons/hi";
import { TYPE_USER } from "../../domain/userData";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/login/core/infrastructure/redux";

export default function ModalCreateUser({ isOpen, onOpenChange }: any) {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

	const user: any = useSelector(selectUser);
	const { alertSuccess } = useAlert();

	const { modelCreate, loading } = repositoryUser.createUser(onSuccess);

	const { handleSubmit, control, setError, formState: { errors } } = useForm<FormDataCreateUser>({
		resolver: yupResolver(schemaValidateCreateUser),
		defaultValues: {
			name: '',
			email: '',
			rol: TYPE_USER.COORDINATOR
		}
	});

	function onSuccess(data: any) {
		if (data) {
			alertSuccess('Cuenta creada con éxito.')
			onOpenChange();
		}
	}

	const onSubmit = async (data: any) => {
		const bodyData = { ...data, referenceUser: user._id }
		console.log('data ', bodyData);

		modelCreate({
			variables: {
				data: {
					...bodyData
				}
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
									<h2 className='font-bold text-base'>Crear nuevo usuario</h2>
									<p className='text-xs text-secondary-400 dark:text-white/80'>Crear cuenta de usuario.</p>
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
												label='Nombre del usuario'
												size='md'
												radius='sm'
												type='text'
												placeholder="Ingrese el nombre del usuario"
												labelPlacement="outside"
												value={value}
												onChange={onChange}
												isInvalid={errors.name ? true : false}
												errorMessage={errors.name?.message}
											/>
										)}
									/>

									<Controller
										control={control}
										name="email"
										rules={{
											required: true,
										}}
										render={({ field: { onChange, value } }) => (
											<Input
												label='Email'
												size='md'
												radius='sm'
												type='email'
												placeholder="Ingrese un email valido"
												labelPlacement="outside"
												value={value}
												onChange={onChange}
												isInvalid={errors.email ? true : false}
												errorMessage={errors.email?.message}
											/>
										)}
									/>

									<Controller
										control={control}
										name="rol"
										rules={{
											required: true,
										}}
										render={({ field: { onChange, value } }) => (
											<Select
												label='Tipo de usuario'
												placeholder="Tipo de usuario"
												labelPlacement="outside"
												selectionMode="single"
												onChange={onChange}
												defaultSelectedKeys={[value]}
												selectorIcon={<HiOutlineSelector />}
											>
												<SelectItem key={TYPE_USER.ADMIN} value={TYPE_USER.ADMIN}>{TYPE_USER.ADMIN}</SelectItem>
												<SelectItem key={TYPE_USER.COORDINATOR} value={TYPE_USER.COORDINATOR}>{TYPE_USER.COORDINATOR}</SelectItem>
											</Select>
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
