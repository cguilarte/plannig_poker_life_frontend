import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardHeader, Divider, Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { schemaValidateCreateTask } from '../../domain/validateSchema';
import { FormDataCreateTask, IIssues, ITask } from '../../domain/interfaces';
import { BsPlus } from 'react-icons/bs';
import CardListTask from './CardListTask.tsx';

interface Iprops {
	onSaveTask: React.Dispatch<React.SetStateAction<[] | IIssues[] | ITask[]>>;
	tasks: [] | ITask[] | IIssues[];
}

const CardTaskManual = ({ tasks, onSaveTask }: Iprops) => {
	const { handleSubmit, control, setError, reset, formState: { errors } } = useForm<FormDataCreateTask>({
		resolver: yupResolver(schemaValidateCreateTask),
		defaultValues: {
			title: '',
			description: ''
		}
	});


	const onSubmit = (data: any) => {
		const body = { ...data, key: crypto.randomUUID() }
		onSaveTask((items) => [...items, body])
		reset();
	}



	console.log(tasks);


	return (
		<div className='flex flex-col gap-4 col-span-7'>
			<Card shadow='sm' className='p-4'>

				<CardHeader className="p-0 flex flex-col items-start">
					<p className="font-bold text-sm text-secundary-400 ">Gestión de tareas</p>
				</CardHeader>
				<Divider className="my-4" />
				<div className='flex flex-col flex-nowrap gap-4'>
					<Controller
						control={control}
						name="title"
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<Input
								classNames={{
									label: 'text-black font-bold text-sm',
								}}
								size='md'
								type="text"
								onChange={onChange}
								radius='sm'
								placeholder="Ingrese el titulo de la planning"
								labelPlacement="outside"
								value={value}
								isInvalid={errors.title ? true : false}
								errorMessage={errors.title?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="description"
						rules={{
							required: true,
						}}
						render={({ field: { onChange, value } }) => (
							<Textarea
								classNames={{
									label: 'text-black font-bold text-sm'
								}}
								size='md'
								onChange={onChange}
								radius='sm'
								placeholder="Ingrese una descripción de la planning"
								labelPlacement="outside"
								value={value}
								isInvalid={errors.description ? true : false}
								errorMessage={errors.description?.message}
							/>
						)}
					/>
					<div className='relative'>
						<Button onClick={handleSubmit(onSubmit)} variant="flat" color='primary' size='sm' startContent={<BsPlus className="text-lg" />} fullWidth={false}>Agregar tarea</Button>

					</div>

				</div>
			</Card>

			<Card shadow='sm' className='p-4 min-h-auto'>
				<CardHeader className="p-0 flex flex-col items-start">
					<p className=" font-bold text-secundary-400">Tareas agregadas</p>
				</CardHeader>

				<Divider className="my-4" />

				<CardListTask
					data={tasks}
					setData={onSaveTask}
				/>
			</Card>

		</div>
	)
}

export default CardTaskManual