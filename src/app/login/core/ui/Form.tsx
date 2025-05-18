/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Input, Spinner } from '@nextui-org/react';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser } from '../infrastructure/redux';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLoginValidate } from '../domain/validateSchema';
import { FormDataLogin, ILogin } from '../domain/interfaces';
import Organiza from './animations/organiza';
import { setAccessToken } from '@/infrastructure/utils';


export default function Form() {
	const [isVisible, setIsVisible] = React.useState(false);
	const { data: session } = useSession();
	const dispatch = useDispatch();
	const router = useRouter();
	const toggleVisibility = () => setIsVisible(!isVisible);

	const [loading, setLoading] = useState(false);
	const [errorRequest, setErrorRequest] = useState<string | null | undefined>(null);
	const [successRequest, setSuccesRequest] = useState<boolean>(false);


	const { handleSubmit, control, setError, formState: { errors } } = useForm<FormDataLogin>({
		resolver: yupResolver(schemaLoginValidate),
	});


	const onSubmit = async (data: ILogin) => {
		setLoading(true);
		const responseNextAuth = await signIn("credentials", {
			...data,
			redirect: false,
		});

		if (!responseNextAuth?.ok) setErrorRequest(responseNextAuth?.error);
		setLoading(false);

	}

	const loginGoogle = async () => {
		await signIn("google", { redirect: false });
	}

	useEffect(() => {
		if (session) {
			setSuccesRequest(!successRequest);
			dispatch(setUser(session?.user));
			setAccessToken(session.user.accessToken);
			setLoading(false);
			window.location.href = "/plannings";
		}
	}, [session])


	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-[780px]'>
				<div className='grid grid-cols-12 gap-0 rounded-lg overflow-hidden h-[500px] bg-white'>
					<div className='bg-primary flex flex-col items-center justify-center h-full col-span-5 p-8 relative overflow-hidden'>

						<div className='absolute -left-10 -top-2 rounded-full w-48 h-48 bg-[#647af9]'></div>
						<div className='absolute -right-10 -bottom-2 rounded-full w-48 h-48 bg-[#647af9]'></div>

						<div className='flex flex-col justify-center items-center z-50'>
							<Organiza />
							<div className='relative -top-6 text-center'>
								<h2 className='text-white font-bold text-md'>Organiza y Construye</h2>
								<p className='text-white text-xs font-normal'>Organiza cada etapa y proceso de la planning</p>
							</div>
						</div>


					</div>
					<div className='h-full col-span-7 p-8 flex flex-col items-center justify-center'>

						<div className='relative w-72 h-10 overflow-hidden'>
							<Image src='/img/logoColor.svg' priority={true} alt='Logo Planning poker life' layout="fill" objectFit="contain" />
						</div>

						<h2 className='text-sm text-black/70'>Bienvenido de vuelta!</h2>

						<div className='mt-8 w-3/4 space-y-4'>
							<Controller
								control={control}
								name="email"
								rules={{
									required: true,
								}}
								render={({ field: { onChange, value } }) => (
									<>
										<Input
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
								name="password"
								rules={{
									required: true,
								}}
								render={({ field: { onChange, value } }) => (
									<Input
										size='md'
										radius='sm'
										type={isVisible ? "text" : "password"}
										placeholder="Password"
										labelPlacement="outside"
										value={value}
										onChange={onChange}
										isInvalid={errors.password ? true : false}
										errorMessage={errors.password?.message}
										startContent={
											<RiLockPasswordLine className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
										}
										endContent={
											<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
												{isVisible ? (
													<BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
												) : (
													<BsEye className="text-2xl text-default-400 pointer-events-none" />
												)}
											</button>
										}
									/>
								)}
							/>

							{errorRequest && <span className='text-xs text-red-500'>{errorRequest}</span>}
							{successRequest && <span className='text-xs text-green-600 mt-4 block'>Logeado con exito, en breve sera redireccionado! <Spinner size="sm" /></span>}

							<Button isLoading={loading} type="button" onClick={handleSubmit(onSubmit)} color="primary" size='md' className='w-full' radius='full'> Iniciar sesión</Button>

							<div className="flex h-[0.5px] w-full items-center justify-center bg-gray-300 after:contents !mt-8 !mb-4">
								<span className="bg-white p-1 text-base text-black/60">ó</span>
							</div>

							<Button color='default' type='button' onClick={loginGoogle} variant="ghost" startContent={<FcGoogle className="text-xl" />} className='w-full' radius='full'>
								Entrar con Google
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
