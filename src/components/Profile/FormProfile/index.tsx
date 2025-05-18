/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiUser } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import Avatars from '@/components/Avatars'
import { PiPasswordLight } from "react-icons/pi";
import { FormDataUpdateProfile } from '../core/domain/interfaces'
import { schemaUpdateProfile } from '../core/domain/validateSchema'
import { servicesProfile } from '../core/infrastructure/services'
import useAlert from '@/infrastructure/hooks/useAlert'
import LoadingInternal from '@/components/LoadingInternal'
import { setUser } from '@/app/login/core/infrastructure/redux'
import { useSession } from 'next-auth/react'


const FormProfile = ({ isOpen, onOpenChange }: any) => {
	const dispatch = useDispatch();
	const { data: session }: any = useSession();
	const [avatar, setAvatar] = useState<string | null>(null);
	const [ErrorPlanning, setErrorPlanning] = useState<string | null>(null);
	const [changePassword, setChangePassword] = useState(false);
	const { alertSuccess, alertError } = useAlert();
	const { data: profile, loading: loadingProfile } = servicesProfile.getProfile();
	const { modelUpdate, loading } = servicesProfile.updateProfile((result: any) => {
		const { __typename } = result.updateProfile;

		if (__typename === 'Error') {
			alertError('Error al actualizar el perfil. intentalo más tarde');
			return false;
		}
		const user: any = session.user;
		const userUpdate = { ...user, ...result.updateProfile }
		dispatch(setUser(userUpdate));

		onOpenChange();
		alertSuccess('Perfil actualizado con éxito.');

	})

	const { handleSubmit, control, setValue, formState: { errors } } = useForm<FormDataUpdateProfile>({
		resolver: yupResolver(schemaUpdateProfile),
		defaultValues: {
			name: '',
			changePassword: false,
			password: '',
			confirmPassword: '',
		}
	});

	const onSubmit = async (data: any) => {
		modelUpdate({
			variables: {
				data: {
					name: data.name,
					avatar,
					changePassword: data.changePassword,
					password: data.password
				}
			}
		})

	}

	useEffect(() => {
		if (profile) {
			setValue('name', profile.name);
			setValue('email', profile.email);
			if (profile.avatar) {
				setAvatar(profile.avatar);

			}
		}
	}, [profile]);



	return (

		<Modal backdrop='blur' size='sm' isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Actualizar perfil</ModalHeader>
						<ModalBody>
							{loadingProfile ? <LoadingInternal /> :
								<div className='w-full space-y-4 my-4'>
									<div className='flex items-center space-x-6'>
										<Avatars avatar={avatar} onSave={setAvatar} />
										<Controller
											control={control}
											name="name"
											rules={{
												required: true,
											}}
											render={({ field: { onChange, value } }) => (
												<Input
													size='md'
													radius='sm'
													type='text'
													placeholder="Nombre de usuario"
													labelPlacement="outside"
													value={value}
													onChange={onChange}
													isInvalid={errors.name ? true : false}
													errorMessage={errors.name?.message}
													startContent={
														<BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
													}
												/>
											)}
										/>

									</div>


									<Controller
										control={control}
										name="email"
										rules={{
											required: true,
										}}
										render={({ field: { onChange, value } }) => (
											<>
												<Input
													disabled={true}
													size='md'
													type="email"
													onChange={onChange}
													radius='sm'
													placeholder="Email"
													labelPlacement="outside"
													value={value}
													isInvalid={errors.email ? true : false}
													errorMessage={errors.email?.message}
													startContent={
														<HiOutlineMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
													}
												/>
											</>
										)}
									/>


									<Controller
										control={control}
										name='changePassword'
										rules={{
											required: true,
										}}
										render={({ field: { onChange, value } }) => (
											<Checkbox checked={value} onChange={(e) => {
												onChange(e);
												setChangePassword(!changePassword)
											}} size='sm'>Cambiar contraseña</Checkbox>
										)}
									/>

									<div className={`space-y-4 ${!changePassword ? 'hidden' : ''}`}>
										<Controller
											control={control}
											name="password"
											render={({ field: { onChange, value } }) => (
												<>
													<Input
														size='md'
														type="password"
														onChange={onChange}
														radius='sm'
														placeholder="Contraseña nueva"
														labelPlacement="outside"
														value={value}
														isInvalid={errors.password ? true : false}
														errorMessage={errors.password?.message}
														startContent={
															<PiPasswordLight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
														}
													/>
												</>
											)}
										/>

										<Controller
											control={control}
											name="confirmPassword"
											render={({ field: { onChange, value } }) => (
												<>
													<Input
														size='md'
														type="password"
														onChange={onChange}
														radius='sm'
														placeholder="Repetir contraseña"
														labelPlacement="outside"
														value={value}
														isInvalid={errors.confirmPassword ? true : false}
														errorMessage={errors.confirmPassword?.message}
														startContent={
															<PiPasswordLight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
														}
													/>
												</>
											)}
										/>

									</div>


								</div>
							}

						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Cerrar
							</Button>
							<Button isLoading={loading} onClick={handleSubmit(onSubmit)} type='button' color="primary">
								Actualizar datos
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default FormProfile
