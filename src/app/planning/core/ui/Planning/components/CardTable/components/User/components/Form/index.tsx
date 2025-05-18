import { FormDataUpdatePerfilGuest } from '@/app/planning/core/domain/interfaces';
import { schemaUpdatePerfilGuest } from '@/app/planning/core/domain/validateSchema';
import { selectInfoPlanning, selectPlanningId, selectProfile } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { ITeam } from '@/app/plannings/core/domain/interfaces';
import Avatars from '@/components/Avatars'
import { useAppSelector } from '@/infrastructure/hooks/store';
import useAlert from '@/infrastructure/hooks/useAlert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';

const Form = ({ isOpen, onOpenChange, onClose }: any) => {
	const { teams }: any = useAppSelector(selectInfoPlanning);
	const { alertSuccess } = useAlert();
	const profile: any = useAppSelector(selectProfile);
	const planningId = useAppSelector(selectPlanningId);
	const [avatar, setAvatar] = useState<string | null>(profile.avatar);
	const [selected, setSelected] = React.useState<string>(profile.team._id);

	const { updatePerfilGuest, loading } = servicesPlanningLive.updatePerfilGuest(onSuccess);

	const { handleSubmit, control, setError, formState: { errors } } = useForm<FormDataUpdatePerfilGuest>({
		resolver: yupResolver(schemaUpdatePerfilGuest),
		defaultValues: {
			name: profile.name,
		}
	});

	function onSuccess(data: any) {
		if (data) {
			onClose();
			alertSuccess('Perfil actualizado con éxito.')
		}
	}

	const onSubmit = async (data: any) => {
		updatePerfilGuest({
			variables: {
				data: {
					...data,
					teamId: selected,
					planningId,
					avatar,
					id: profile._id
				}
			}
		});

	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				scrollBehavior='inside'
				onOpenChange={onOpenChange}
				hideCloseButton={true}
				backdrop='blur'
				size='sm'
				className='dark:ring-2 dark:ring-default'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>

								<div className=''>
									<h2 className='font-bold text-base'>Mi perfil</h2>
									<p className='text-xs text-secondary-400 dark:text-white/80'>Actualizar datos del perfil.</p>
									<Divider orientation='horizontal' className='my-2' />
								</div>

								<div className='w-full space-y-4'>

									<div className='flex items-center space-x-6'>
										<Avatars onSave={setAvatar} avatar={profile.avatar} />
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
													placeholder="Tu nombre para mostrar"
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

									<div className=' rounded-md p-2'>
										<RadioGroup
											label="Seleccione el equipo al que pertenece"
											orientation="horizontal"
											color="primary"
											className='text-xs'
											onValueChange={(value: string) => setSelected(value)}
											classNames={{
												label: 'text-sm text-secondary-400 dark:text-white/80',
												base: ' pb-1 gap-4',
											}}
											defaultValue={selected}
										>
											{teams.length > 0 && teams.map((item: ITeam) => <Radio classNames={{ label: 'text-sm dark:text-white/50' }} key={item._id} value={item._id}>{item.name}</Radio>)}

										</RadioGroup>
									</div>

								</div>
							</ModalBody>

							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cerrar
								</Button>
								<Button color="primary" isLoading={loading} onClick={handleSubmit(onSubmit)}>
									Actualizar perfil
								</Button>
							</ModalFooter>

						</>
					)}
				</ModalContent>
			</Modal>


		</>
	)
}

export default Form
