'use client';

import { FormDataUpdatePerfilGuest } from '@/app/planning/core/domain/interfaces';
import { schemaUpdatePerfilGuest } from '@/app/planning/core/domain/validateSchema';
import { repositoryTeam } from '@/app/teams/core/infrastructure/repository';
import Avatars, { AVATAR_ARRAY } from '@/components/Avatars';
import useAlert from '@/infrastructure/hooks/useAlert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';

export default function Page() {
	const param = useParams();
	const { alertError } = useAlert();
	const [success, setSucces] = useState(false);

	const { modelUpdateGuest, loading } = repositoryTeam.updateGuest((result: any) => {
		const { updateGuest } = result;
		if (!updateGuest) {
			alertError('Erro al confirmar la invitación. contacte con el administrador.');
			return false;
		}

		setSucces(!success)

	})

	const [avatar, setAvatar] = useState<string | null>(`/img/avatars/${AVATAR_ARRAY[Math.floor(Math.random() * AVATAR_ARRAY.length)]}`);

	const { handleSubmit, control, formState: { errors } } = useForm<FormDataUpdatePerfilGuest>({
		resolver: yupResolver(schemaUpdatePerfilGuest),
		defaultValues: {
			name: ''
		}
	});

	const onSubmit = async (data: any) => {
		const bodyData = { ...data, avatar, status: 'A' };

		modelUpdateGuest({
			variables: {
				data: bodyData,
				updateGuestId: param.id
			}
		})

	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-[380px]'>

				<div className='grid w-full gap-0 rounded-lg overflow-hidden h-[400px] bg-white'>

					<div className='h-full p-8 w-full flex flex-col items-center justify-center'>

						{success ? <>
							<div className="flex flex-col items-center justify-center relative">
								<div className=" w-72 h-60 relative">
									<Image src="/img/confirmed-document.svg" objectFit='cover' layout="fill" alt="Planning create" />
								</div>
								<div className="text-center mb-4 flex flex-col flex-grow items-center justify-center -mt-5">
									<h2 className=" font-bold text-xl text-green-700">Invitación confirmada.</h2>
									<p className='text-xs text-black/60'>Gracias por unirte a nosotros en esta emocionante aventura de planificación ágil.</p>
								</div>
							</div>
						</> : <>
							<div className='relative w-72 h-10 overflow-hidden'>
								<Image src='/img/logoColor.svg' priority={true} alt='Logo Planning poker life' layout="fill" objectFit="contain" />
							</div>

							<h2 className='text-sm text-black/70'>Bienvenido! Confirmación de invitación</h2>

							<div className='flex items-center space-x-6 mt-10'>
								<Avatars onSave={setAvatar} avatar={avatar} />
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

							<div className='mt-8 w-3/4 space-y-4'>
								<Button onClick={handleSubmit(onSubmit)} isLoading={loading} type="button" color="primary" size='md' className='w-full' radius='full'>Confirmar cuenta</Button>
							</div>

						</>}
					</div>

				</div>

			</div>
		</div>
	)
}
