/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TitlePage } from '@/components'
import React, { useEffect, useState } from 'react'
import { SYSTEM_CARD, TYPE_VISIBILITY, TypePlanning, metadata } from '../core/domain/planningData'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaValidateCreatePlanning } from '../core/domain/validateSchema';
import { FormDataCreatePlanning, IGuest, IIssues, IPlanning, ITask, ITeam } from '../core/domain/interfaces';
import { Avatar, Button, Checkbox, CheckboxGroup, Chip, Input, Radio, RadioGroup, Select, SelectItem, Textarea, useDisclosure } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { repositoryPlanning } from '../core/infrastructure/repository';
import LoadingInternal from '@/components/LoadingInternal';
import { CustomCheckbox } from '@/components/CustomCheckbox/CustomCheckbox';
import CardTaskJira from '../core/ui/CardTaskJira';
import CardTaskManual from '../core/ui/CardTaskManual';
import { IoMdSave } from 'react-icons/io';
import SuccessCreate from '../core/ui/SuccessCreate';
import { getAccessToken, getRefreshAccessToken, setAccessToken, setRefreshAccessToken } from '../core/infrastructure/utils';
import useAlert from '@/infrastructure/hooks/useAlert';
import LayoutPrivate from '@/infrastructure/providers/LayoutPrivate';
import { BiHide, BiShow } from 'react-icons/bi';

const Create = () => {
	const params = useSearchParams();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [typePlanningSelected, setTypePlanningSelected] = useState<string | null>(params.get('type'));
	const [typeForm, setTypeForm] = useState<string | null>(null);
	const idForm = params.get('id');
	const { alertError, alertSuccess } = useAlert()

	const { handleSubmit, control, setValue, getValues, watch, setError, formState: { errors } } = useForm<FormDataCreatePlanning>({
		resolver: yupResolver(schemaValidateCreatePlanning),
		defaultValues: {
			title: '',
			description: '',
			sendMail: false,
			systemCard: "FIBONACCI",
			protectPlanning: false,
		}
	});

	const [resourceId, setResourceIdKey] = useState<string>('');

	const { result: listTeams, loading: loadingTeams } = repositoryPlanning.getTeams();
	const { getQueryAccessToken, data: token } = repositoryPlanning.getAccessToken();
	const { createPlaningManual, loading: loadingCreateManual, error: errorCreateManual } = repositoryPlanning.createPlanningManual(onSuccess);
	const { createPlaningJira, loading: loadingCreateJira, error: errorCreateJira } = repositoryPlanning.createPlanningJira(onSuccess);
	const { getPlanningId, loading: loadingPlanningId, data: detailPlanning } = repositoryPlanning.detailPlanningId();
	const { udpateP } = repositoryPlanning.updatePlanning(onSuccessUpdate);
	const [access_token_planning, set_access_token_planning] = useState<string | null | undefined>(getAccessToken());

	const [teamListAdd, setTeamListAdd] = useState<string[]>([]);

	const [guests, setGuests] = useState<IGuest[]>([]);

	const [loadingGuest, setLoadingGuest] = useState<boolean>(false);

	const [task, setTask] = useState<[] | ITask[] | IIssues[] | any[]>([]);

	const [planningId, setPlanningId] = useState<string | null>(null);

	const [typeVisibility, setTypeVisibility] = useState(TYPE_VISIBILITY.PRIVATE);

	const [hasProtectPassowd, setHasProtectPassowd] = useState<boolean | undefined>(false);

	const [showPassword, setShowPassword] = useState(false);

	function onSuccessUpdate(result: any) {
		if (result.updatePlanningData) {
			alertSuccess('Planning actualizada con exito.')
		}
	}

	function onSuccess(result: any) {
		const { status, planningId } = typePlanningSelected === TypePlanning.MANUAL.toLowerCase() ? result.createPlanningManual : result.createPlanningJira;

		if (status) {
			setPlanningId(planningId);
			onOpen();
		}
	}

	const addGuestPlanning = (data: string[]) => {
		for (const teamId of data) {
			if (!teamListAdd.includes(teamId)) {
				const team: ITeam = listTeams.find((item: ITeam) => item._id === teamId);
				const guestsList = team.guests;
				setGuests(guests.concat(guestsList));
				setTeamListAdd([...teamListAdd, teamId]);
			}
		}
	}

	const handleAddGuest = (data: any) => {
		setLoadingGuest(true);
		if (teamListAdd.length > 0) {
			for (const id of teamListAdd) {
				if (!data.includes(id)) {
					// eliminamos la seleccion
					setTeamListAdd((items) => items.filter((row: string) => row !== id))
					setGuests(guests.filter((row: IGuest) => row.teamId !== id));

				} else {
					// Agregamos si o existe el team en la lista
					addGuestPlanning(data);
				}
			}

		} else {
			// Inicial relleno de guest
			addGuestPlanning(data);
		}

		setLoadingGuest(false);
	}

	const handleDeleteGuestList = (id: string) => {

		const detailGuest: IGuest | undefined = guests.find((item: IGuest) => item._id === id);

		const totalGuestTeamId: IGuest[] = guests.filter((item: IGuest) => item.teamId === detailGuest?.teamId);

		if ((totalGuestTeamId.length - 1) === 0) {
			setTeamListAdd(teamListAdd.filter((row: string) => row !== detailGuest?.teamId))
		}

		// Eliminamos el guest de la lista de guests
		setGuests((guest) => guest.filter((row: IGuest) => row._id !== id));
	}

	function clearTask(row: any) {
		delete row.__typename;
		delete row.planningId;
		delete row.statusStimate;
		delete row.userId;
		delete row.storyPoint;
		if (row.issuetype) delete row.issuetype.__typename;
		if (row.assignee) delete row.assignee.__typename;
		if (row.creator) delete row.creator.__typename;
		if (row.project) delete row.project.__typename;
		if (row.status) delete row.status.__typename;
		return row;
	}


	const onSubmit = (data: FormDataCreatePlanning) => {

		if (!typePlanningSelected) {
			alertError('Ingrese a una url valida.');
			return false;
		}

		console.log('task: ', task)

		let bodyData = {
			...data,
			typeVisibility,
			guests: guests.length > 0 ? guests.map((row: IGuest) => {
				return {
					_id: row._id,
					name: row.name,
					email: row.email,
					avatar: row.avatar,
					teamId: row.teamId
				};
			}) : [],
			teamIds: teamListAdd,
			typePlanning: typePlanningSelected?.toLocaleUpperCase(),
			task: typePlanningSelected === TypePlanning.MANUAL.toLowerCase() ? (task.length > 0 ? task.map((row: any) => {
				if (row.__typename) delete row.__typename;
				if (row.storyPoint) delete row.storyPoint;
				if (row.statusStimate) delete row.statusStimate;
				return row;

			}) : []) : task.length > 0 ? task.map((row: any) => {
				const newRow = clearTask(row);
				newRow.subtasks = newRow.subtasks.length > 0 ? newRow.subtasks.map((t: any) => clearTask(t)) : [];
				return newRow
			}) : []
		}

		console.log('bodyData: ', bodyData)

		if (idForm) {
			udpateP({
				variables: {
					data: bodyData,
					planningId: idForm
				}
			})
		} else {

			if (typePlanningSelected === TypePlanning.MANUAL.toLowerCase()) {
				createPlaningManual({
					variables: { data: bodyData }
				})
			}

			if (typePlanningSelected === TypePlanning.JIRA.toLowerCase()) {
				const body = {
					...bodyData,
					access_token: getAccessToken(),
					refresh_token: getRefreshAccessToken(),
					resourceId,
				}
				createPlaningJira({
					variables: { data: body }
				})
			}
		}

	}

	useEffect(() => {
		if (idForm) {
			getPlanningId({
				variables: {
					planningId: idForm
				}
			});
		}

		const typePage: string | null = params.get('type');
		if (typePage) {
			setTypeForm(typePage.toLowerCase());
			if (typePage === TypePlanning.JIRA.toLowerCase()) {
				if (!access_token_planning) {
					getQueryAccessToken({ variables: { code: params.get('code') } })
				}
			}
		}

	}, []);

	useEffect(() => {
		if (token) {
			const { getAccessToken } = token;
			if (getAccessToken.access_token) {
				setAccessToken(getAccessToken.access_token);
				setRefreshAccessToken(getAccessToken.refresh_token)
				set_access_token_planning(getAccessToken.access_token);
				//dispatch(setAccessTokenCreatePlanning(getAccessToken.access_token))
			}
		}
	}, [token])

	useEffect(() => {
		if (detailPlanning) {
			const detail: IPlanning = detailPlanning.getPlanning;
			setTypeForm(detail.typePlanning.toLowerCase());
			setTypePlanningSelected(detail.typePlanning.toLowerCase());
			setValue('title', detail.title);
			setValue('description', detail.description);
			setValue('systemCard', detail.systemCard);
			setTypeVisibility(detail.typeVisibility);
			const listTeam = detail.guests.map((item: IGuest) => item.teamId);
			setTeamListAdd(Array.from(new Set(listTeam)))
			setGuests(detail.guests);
			setValue('sendMail', detail.sendMail);
			setTask(detail.typePlanning === TypePlanning.MANUAL ? detail.task as ITask[] : detail.task as IIssues[]);

			setValue('protectPlanning', detail.protectPlanning);

			if (detail.typePlanning === TypePlanning.JIRA) {
				setAccessToken(detail.access_token as string);
				setRefreshAccessToken(detail.refresh_token as string)
				set_access_token_planning(detail.access_token);
			}


		}
	}, [detailPlanning]);

	useEffect(() => {
		const { protectPlanning } = watch()
		setHasProtectPassowd(protectPlanning);
	}, [watch()])

	return (
		<LayoutPrivate>

			<div className="flex flex-col relative">
				<TitlePage
					onBack="/plannings"
					title={`${idForm ? metadata.update : metadata.create}`}
					heading="Formulario"
				/>

				<div className='grid grid-cols-12 gap-4 pt-10'>
					{loadingPlanningId && <LoadingInternal />}

					<div className='col-span-5'>
						<div className='relative h-full'>
							<form className='flex flex-col gap-6 sticky top-0 '>
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

								<Controller
									control={control}
									name="systemCard"
									rules={{
										required: true,
									}}
									render={({ field: { onChange, value } }) => (
										<div className='flex flex-col'>
											<Select
												name='systemCard'
												size='md'
												onChange={onChange}
												radius='sm'
												classNames={{
													label: 'text-black font-bold text-sm'
												}}
												placeholder="Baraja de carta"
												labelPlacement="outside"
												selectedKeys={[value]}
												isInvalid={errors.systemCard ? true : false}
												errorMessage={errors.systemCard?.message}
											>
												<SelectItem key={SYSTEM_CARD.TSHIRTS} value={SYSTEM_CARD.TSHIRTS}>{SYSTEM_CARD.TSHIRTS}</SelectItem>
												<SelectItem key={SYSTEM_CARD.LINEAR} value={SYSTEM_CARD.LINEAR}>{SYSTEM_CARD.LINEAR}</SelectItem>
												<SelectItem key={SYSTEM_CARD.FIBONACCI} value={SYSTEM_CARD.FIBONACCI}>{SYSTEM_CARD.FIBONACCI}</SelectItem>
											</Select>

											{value === SYSTEM_CARD.TSHIRTS && <Chip size='sm' variant='bordered' classNames={{ content: 'text-[11px] font-bold ' }} className='text-secondary-400 d-block mt-2'>XXS XS METRO l SG XL ? ☕︎</Chip>}
											{value === SYSTEM_CARD.LINEAR && <Chip size='sm' variant='bordered' classNames={{ content: 'text-[11px] font-bold ' }} className='text-secondary-400 d-block mt-2'> 0 1 2 3 4 5 6 7 8 9 10 ?☕︎</Chip>}
											{value === SYSTEM_CARD.FIBONACCI && <Chip size='sm' variant='bordered' classNames={{ content: 'text-[11px] font-bold ' }} className='text-secondary-400 d-block mt-2'>0 1 2 3 5 8 13 21 34 55 89 ? ☕︎</Chip>}

										</div>
									)}
								/>

								<div className='flex flex-col'>
									<label className='block pb-2 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none text-black font-bold text-sm'>Visibilidad</label>
									<RadioGroup
										size='sm'
										value={typeVisibility}
										onValueChange={(value: string) => setTypeVisibility(value)}
										orientation="vertical"
									>
										<Radio description="Antes de entrar, se verificará a cada participante contra la lista de invitados; quien no figure en ella, no podrá acceder." value={TYPE_VISIBILITY.PRIVATE}>Privado</Radio>
										<Radio description="Todo participante que posea la URL compartida del planificador tendrá acceso permitido." value={TYPE_VISIBILITY.PUBLIC}>Publico</Radio>
									</RadioGroup>
								</div>

								{typeVisibility === TYPE_VISIBILITY.PRIVATE &&
									<>
										<div className='relative'>
											{loadingGuest || loadingTeams && <LoadingInternal />}
											<CheckboxGroup
												label="Teams"
												classNames={{
													label: 'text-black font-bold text-sm'
												}}
												onChange={handleAddGuest}
												value={teamListAdd}
												orientation="horizontal"
												isDisabled={loadingGuest}
												size='md'
											>

												{listTeams.length > 0 && listTeams.map((item: ITeam, index: number) => <CustomCheckbox isDisabled={item.guests.length === 0} key={index} size='sm' value={item._id}>{item.name}</CustomCheckbox>)}

											</CheckboxGroup>
										</div>

										<div className='flex flex-col'>
											<label className='block pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none text-black font-bold text-sm'>Invitados ({guests.length})</label>
											<div className='w-full px-2 py-4 bg-[#F4F4F5] rounded-lg gap-2 flex flex-wrap'>

												{guests.length > 0 &&
													guests.map((item: IGuest) =>
														<Chip
															key={item._id}
															onClose={() => handleDeleteGuestList(item._id)}
															variant="flat"
															size='md'
															classNames={{
																base: 'bg-white text-xs shadow-md',
																closeButton: 'text-secondary-400'
															}}
															avatar={
																<Avatar
																	name="JW"
																	classNames={{
																		img: 'w-12 h-12'
																	}}
																	src={item.avatar}
																/>
															}
														>{item.name}</Chip>)
												}
											</div>
										</div>

										<Controller
											control={control}
											name="sendMail"
											render={({ field: { onChange, value } }) => (
												<div className='flex flex-col'>
													<label className='block pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none text-black font-bold text-sm'>Notificación</label>
													<Checkbox name='sendMail' onChange={onChange} isSelected={value} defaultSelected={Boolean(value)} size='sm' >Enviar invitación por mail</Checkbox>
												</div>
											)}
										/>
									</>
								}

								<Controller
									control={control}
									name="protectPlanning"
									render={({ field: { onChange, value } }) => (
										<div className='flex flex-col'>
											<label className='block pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none text-black font-bold text-sm'>Proteger planning</label>
											<Checkbox name='protectPlanning' onChange={onChange} isSelected={value} defaultSelected={Boolean(value)} size='sm' >Habilitar el acceso a la planning por contraseña</Checkbox>
										</div>
									)}
								/>

								{
									hasProtectPassowd && (
										<Controller
											control={control}
											name="protectPassword"
											rules={{
												required: true,
											}}
											render={({ field: { onChange, value } }) => (
												<Input
													classNames={{
														label: 'text-black font-bold text-sm',
													}}
													endContent={<Button onClick={() => setShowPassword(!showPassword)} size='sm' isIconOnly>{showPassword ? <BiHide className='text-lg' /> : <BiShow className='text-lg' />}</Button>}
													size='md'
													type={`${showPassword ? "text" : "password"}`}
													onChange={onChange}
													radius='sm'
													placeholder="Ingrese la contraseña de la planning"
													labelPlacement="outside"
													value={value}
													isInvalid={errors.protectPassword ? true : false}
													errorMessage={errors.protectPassword?.message}
												/>
											)}
										/>
									)
								}

								<div className='relative'>
									<Button color='primary' isLoading={loadingCreateManual} size='md' fullWidth={false} onClick={handleSubmit(onSubmit)} startContent={<IoMdSave className="text-lg" />}>{idForm ? 'Actualizar planning' : 'Crear planning'}</Button>
								</div>

							</form>
						</div>
					</div>
					{
						typeForm && typeForm === TypePlanning.JIRA.toLowerCase() ?
							<CardTaskJira tasks={task} onSaveTask={setTask} setResourceIdKey={setResourceIdKey} /> : <CardTaskManual tasks={task} onSaveTask={setTask} />
					}
				</div>
			</div>
			<SuccessCreate planningId={planningId} isOpen={isOpen} onOpenChange={onOpenChange} />
		</LayoutPrivate>
	)
}

export default Create