import { Avatar, Button, Card, CardHeader, CheckboxGroup, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Tooltip, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { repositoryPlanning } from '../../infrastructure/repository';
import LoadingInternal from '@/components/LoadingInternal';
import { IIssues, ITask } from '../../domain/interfaces';

import { MdPlaylistAdd } from 'react-icons/md';
import CardIssuesAdd from './CardIssuesAdd';
import CardIssues from './CardIssues';
import { getAccessToken } from '../../infrastructure/utils';
import 'core-js/actual/array/group-by'
import { CustomCheckbox } from '@/components/CustomCheckbox/CustomCheckbox';
import { SiJira } from "react-icons/si";

interface Iprops {
	tasks: [] | ITask[] | IIssues[];
	onSaveTask: React.Dispatch<React.SetStateAction<[] | IIssues[] | ITask[] | unknown[]>>;
	setResourceIdKey: React.Dispatch<React.SetStateAction<string>>;
}

const CardTaskJira = ({ tasks, onSaveTask, setResourceIdKey }: Iprops) => {
	const token = getAccessToken();
	const [resourceId, setResourceId] = useState<string | null>(null);
	const [boardId, setBoardId] = useState<number | null>(null);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { getQueryProjects, result: listProjects, loading: loadingProjects } = repositoryPlanning.getProjectsJira();
	const { getQueryBoards, result: listBoards, loading: loadingBoards } = repositoryPlanning.getBoardsJira();
	const { getQuerySprints, result: listSprints, loading: loadingSprints } = repositoryPlanning.getSprintsJira();
	const { getQueryTask, result: listTasks, loading: loadingTasks } = repositoryPlanning.getTaskJira();

	const [issues, setIssues] = useState<IIssues[] | []>([]);
	const [issuesJira, setIssuesJira] = useState<IIssues[] | [] | ITask[] | unknown[]>(tasks);


	const { result: listResources, loading: loadinResources } = repositoryPlanning.getResourcesJira(token);

	const [groupSelected, setGroupSelected] = React.useState<any>([]);
	const [listProjectsTask, setListProjectsTask] = useState<string[]>([]);
	const [listIssuesProject, setListIssuesProject] = useState<any>({});

	const handleClickResource = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setResourceId(e.target.value);
		setResourceIdKey(e.target.value)
		getQueryProjects({
			variables: {
				resourceId: e.target.value,
				accessToken: token
			}
		})
	}

	const handleClickProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
		getQueryBoards({
			variables: {
				resourceId: resourceId,
				accessToken: token,
				projectId: e.target.value
			}
		})
	}

	const handleClickBoard = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBoardId(parseFloat(e.target.value));
		getQuerySprints({
			variables: {
				resourceId: resourceId,
				accessToken: token,
				boardId: parseFloat(e.target.value)
			}
		})
	}

	const handleClickSprint = (e: React.ChangeEvent<HTMLSelectElement>) => {
		getQueryTask({
			variables: {
				resourceId: resourceId,
				accessToken: token,
				sprintId: parseFloat(e.target.value),
				boardId: boardId

			}
		})
	}

	const handleAddTaks = (item: IIssues) => {
		//setIssues(issues.filter((row: IIssues) => row.key !== item.key));
		onSaveTask((items) => [...items, item]);
		//setIssuesJira((items) => [...items, item])
	}

	const handleDelete = (item: IIssues) => {
		onSaveTask((items) => items.filter((row: any) => row.key !== item.key))
	}


	const handleAddAllTask = () => {
		//setIssuesJira((items) => [...items, ...issues]);
		onSaveTask((items) => [...items, ...issues]);
		//setIssues([]);
	}

	const handleAddTaskOrder = (issues: IIssues[] | [] | any[]) => {
		onSaveTask(issues);
		//setIssuesJira(issues)
	}


	useEffect(() => {
		if (listTasks.length > 0) {
			setIssues(listTasks)

			const result = listTasks.groupBy((task: any) => task.project.name);
			if (result) {
				setListIssuesProject(result);
				setListProjectsTask(Object.keys(result))
			}
		}
	}, [listTasks])

	useEffect(() => {

		if (groupSelected.length === 0) {
			setIssues(listTasks);
		} else {

			let listTasks: any[] = [];

			groupSelected.forEach((row: string) => {
				listTasks = [...listTasks, ...listIssuesProject[row]]
			});

			setIssues(listTasks);
		}
	}, [groupSelected])



	return (
		<>
			<div className='flex flex-col gap-4 col-span-7'>

				{/* <div className='w-full flex items-center justify-center border-2 border-dashed h-20 rounded-lg bg-white'>
					<Button onPress={onOpen}>Buscar tareas</Button>
				</div> */}

				{/* <Card shadow='sm' className='p-4'>

					<CardHeader className="p-0 flex flex-col items-start">
						<p className="font-bold tex	t-sm text-secundary-400 ">Gestión de Issues</p>
					</CardHeader>
					<Divider className="my-2" />

					<div className='grid grid-cols-2 gap-2'>

						<div className='relative rounded-xl'>
							{loadinResources && <LoadingInternal />}
							<Select
								label="Cuenta"
								placeholder="Seleccione una cuenta"
								defaultSelectedKeys={[]}
								onChange={handleClickResource}
								size='sm'
								classNames={{
									label: 'font-bold text-black',
									value: 'text-xs'
								}}
							>
								{listResources.length > 0 && listResources.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}

							</Select>
						</div>

						<div className='relative rounded-xl'>
							{loadingProjects && <LoadingInternal />}
							<Select
								label="Proyecto"
								placeholder="Seleccione un proyecto"
								onChange={handleClickProject}
								size='sm'
								fullWidth={true}
								classNames={{
									label: 'font-bold text-black',
									value: 'text-xs'
								}}
							>
								{listProjects.length > 0 && listProjects.map((item: any, index: number) => (
									<SelectItem key={item.id} textValue={item.name} value={item.id}>
										<div className="flex gap-2 items-center">
											<Avatar alt={item.name} className="flex-shrink-0" size='sm' src={item.avatarUrls} />
											<div className="flex flex-col">
												<span className="text-small">{item.name}</span>
												<span className="text-tiny text-default-400">{item.projectTypeKey}</span>
											</div>
										</div>
									</SelectItem>
								))}

							</Select>
						</div>

						<div className='relative rounded-xl'>
							{loadingBoards && <LoadingInternal />}
							<Select
								label="Tablero"
								placeholder="Seleccione un board"
								defaultSelectedKeys={[]}
								onChange={handleClickBoard}
								size='sm'
								classNames={{
									label: 'font-bold text-black',
									value: 'text-xs'
								}}
							>
								{listBoards.length > 0 && listBoards.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}


							</Select>
						</div>

						<div className='relative rounded-xl'>
							{loadingSprints && <LoadingInternal />}
							<Select
								label="Sprint"
								placeholder="Selecione un sprint"
								defaultSelectedKeys={[]}
								onChange={handleClickSprint}
								classNames={{
									label: 'font-bold text-black',
									value: 'text-xs'
								}}
								size='sm'
							>
								{listSprints.length > 0 && listSprints.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}


							</Select>
						</div>

					</div>

					<div className='flex flex-col min-h-auto overflow-y-auto pt-6 space-y-2'>
						<div className='flex items-center justify-between'>
							<p className='text-sm font-bold text-secundary-400'>Lista der tareas</p>
							{issues.length > 0 &&
								<Tooltip classNames={{ base: 'text-xs' }} content="Agregar todas los issues a las tareas.">
									<Button onClick={handleAddAllTask} color="primary" size='sm' variant="bordered" startContent={<MdPlaylistAdd className="text-sm" />}>
										Agregar todo
									</Button>
								</Tooltip>
							}
						</div>
						<Divider className="my-2" />

						<CardIssues
							data={issues}
							onAdd={handleAddTaks}
						/>

					</div>
					{loadingTasks && <Spinner />}

				</Card > */}

				<Card shadow='sm' className='p-4'>
					<CardHeader className="p-0 flex items-start justify-between">
						<p className="font-bold text-base text-secundary-400">Lista de tareas</p>
						<Button size='sm' color='secondary' startContent={<SiJira />} onPress={onOpen}>Buscar tareas</Button>
					</CardHeader>

					<Divider className="my-2" />

					<CardIssuesAdd
						data={tasks}
						setData={handleAddTaskOrder}
						setDataDefault={setIssues}
					/>
				</Card>

			</div>


			<Modal backdrop='blur' size='5xl' placement='top' isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-bold">Gestión de tareas</ModalHeader>
							<ModalBody>

								<div className='grid grid-cols-4 gap-2'>

									<div className='relative rounded-xl'>
										{loadinResources && <LoadingInternal />}
										<Select
											label="Cuenta"
											placeholder="Seleccione una cuenta"
											defaultSelectedKeys={[]}
											onChange={handleClickResource}
											size='sm'
											classNames={{
												label: 'font-bold text-black',
												value: 'text-xs'
											}}
										>
											{listResources.length > 0 && listResources.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}

										</Select>
									</div>

									<div className='relative rounded-xl'>
										{loadingProjects && <LoadingInternal />}
										<Select
											label="Proyecto"
											placeholder="Seleccione un proyecto"
											onChange={handleClickProject}
											size='sm'
											fullWidth={true}
											classNames={{
												label: 'font-bold text-black',
												value: 'text-xs'
											}}
										>
											{listProjects.length > 0 && listProjects.map((item: any, index: number) => (
												<SelectItem key={item.id} textValue={item.name} value={item.id}>
													<div className="flex gap-2 items-center">
														<Avatar alt={item.name} className="flex-shrink-0" size='sm' src={item.avatarUrls} />
														<div className="flex flex-col">
															<span className="text-small">{item.name}</span>
															<span className="text-tiny text-default-400">{item.projectTypeKey}</span>
														</div>
													</div>
												</SelectItem>
											))}

										</Select>
									</div>

									<div className='relative rounded-xl'>
										{loadingBoards && <LoadingInternal />}
										<Select
											label="Tablero"
											placeholder="Seleccione un board"
											defaultSelectedKeys={[]}
											onChange={handleClickBoard}
											size='sm'
											classNames={{
												label: 'font-bold text-black',
												value: 'text-xs'
											}}
										>
											{listBoards.length > 0 && listBoards.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}


										</Select>
									</div>

									<div className='relative rounded-xl'>
										{loadingSprints && <LoadingInternal />}
										<Select
											label="Sprint"
											placeholder="Selecione un sprint"
											defaultSelectedKeys={[]}
											onChange={handleClickSprint}
											classNames={{
												label: 'font-bold text-black',
												value: 'text-xs'
											}}
											size='sm'
										>
											{listSprints.length > 0 && listSprints.map((item: any, index: number) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}


										</Select>
									</div>

								</div>


								<div className="flex flex-col gap-1 w-full my-2">
									{listProjectsTask.length > 0 &&
										<CheckboxGroup
											className="gap-1"
											orientation="horizontal"
											classNames={{ label: 'text-xs font-bold text-black pb-2', base: 'text-xs' }}
											value={groupSelected}
											onChange={setGroupSelected}
										>
											{listProjectsTask.map((item: string, index: number) => <CustomCheckbox key={index} value={item}>{item}</CustomCheckbox>)}
										</CheckboxGroup>
									}
								</div>


								<div className='flex flex-col min-h-auto overflow-y-auto space-y-2'>
									<div className='flex items-center justify-between'>
										<p className='text-sm font-bold text-secundary-400'>Lista de tareas</p>
										{issues.length > 0 &&
											<Tooltip classNames={{ base: 'text-xs' }} content="Agregar todas las tareas.">
												<Button onClick={handleAddAllTask} color="primary" size='sm' variant='solid' startContent={<MdPlaylistAdd className="text-sm" />}>
													Agregar todos
												</Button>
											</Tooltip>
										}
									</div>
									<Divider className="my-2" />
									<div className='max-h-96 overflow-y-scroll space-y-1 pb-4'>
										<CardIssues
											tasks={tasks}
											data={issues}
											onDelete={handleDelete}
											onAdd={handleAddTaks}
										/>
									</div>

								</div>
								{loadingTasks && <Spinner />}


							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>

		</>
	)
}

export default CardTaskJira