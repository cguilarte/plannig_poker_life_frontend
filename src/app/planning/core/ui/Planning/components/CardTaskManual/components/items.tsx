/* eslint-disable @next/next/no-img-element */
import { ITask, TYPE_PLANNING } from '@/app/plannings/core/domain/interfaces';
import { STATUS_TASK } from '@/app/plannings/core/domain/planningData';
import { Button, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Popover, PopoverContent, PopoverTrigger, Tooltip, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { GrPowerReset } from "react-icons/gr";
import { MdDeleteOutline, MdOutlineDeleteOutline } from 'react-icons/md';
import { SlOptionsVertical } from "react-icons/sl";
import { IoPlayOutline, IoReload } from "react-icons/io5";
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { selectInfoPlanning, selectPlanningId, selectTaskCurrent } from '@/app/planning/core/infrastructure/redux';
import { SYSTEM_CARD } from '@/app/planning/core/infrastructure/utils';
import { BiEdit, BiSolidRightArrow } from 'react-icons/bi';
import isAdminPlanning from '@/infrastructure/hooks/IsAdminPlanning';
import Details from '../../CardTaskCurrent/Details';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface IProps {
	item: ITask;
	snapshot: any
}

const Items = ({ item, snapshot }: IProps) => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [openSubtrask, setOpenSubTask] = useState(false);

	const { systemCard }: any = useAppSelector(selectInfoPlanning);
	const [isOpenPop, setIsOpen] = React.useState(false);

	const { selectTask } = servicesPlanningLive.selectTask();
	const { deleteTask, loading: loadingDeleteTask } = servicesPlanningLive.deleteTask();
	const planningId: string | null = useAppSelector(selectPlanningId);
	const currentTask: any = useAppSelector(selectTaskCurrent);
	const { updateTask, loading } = servicesPlanningLive.updateTask()
	const [isOpenPopCard, setIsOpenPopCard] = React.useState(false);

	const isAdmin = isAdminPlanning();

	const handleSelectTask = (e: any) => {
		selectTask({
			variables: {
				taskId: item._id,
				planningId,
			}
		})
	}

	const handleSaveEstimate = (storyPoint: number) => {
		updateTask({
			variables: {
				taskId: item._id,
				planningId,
				stimatePoint: storyPoint,
				newVoto: false
			}
		});
		setIsOpenPopCard(!isOpenPopCard)
	}

	const handleDeleteTask = () => {
		deleteTask({
			variables: {
				taskId: item._id,
				typePlanning: TYPE_PLANNING.MANUAL,
				planningId
			}
		})
	}

	return (
		<>
			<div className={`items-center justify-between group relative mx-4 px-2 py-1 rounded-lg hover:cursor-move transition-all  ${currentTask?._id === item._id ? 'border-2 border-solid border-[#F7B658]' : ''}  ${item.statusStimate === STATUS_TASK.ESTIMATE ? 'bg-[#0080001c] dark:bg-background/40 ' : 'bg-[#fae9d7] dark:bg-[#141B24]'}  ${snapshot.isDragging ? ' border-2 border-dashed border-primary' : ''}`}>

				{currentTask?._id === item._id && <div className='absolute -left-6 top-10'>
					<BiSolidRightArrow className="text-2xl text-[#EBEEF3] dark:text-[#1A1C25]" />
				</div>}

				<div className='flex items-center w-full'>
					<div className='flex flex-col w-full'>
						<div className="flex items-center justify-between ">
							<div className='flex items-center space-x-2'>
								<RxDragHandleDots2 className="text-sm" />
								{(currentTask?._id === item._id && item.statusStimate === STATUS_TASK.PENDING) ?
									<Chip size="sm" color={`warning`} variant='bordered' classNames={{ content: 'font-bold' }} className='text-xs space-x-1 flex items-center animation-pulse bg-white' >  Pendiente</Chip> :
									<Chip size="sm" color={`${item.statusStimate === STATUS_TASK.ESTIMATE ? 'success' : 'warning'}`} variant="bordered" className='text-xs bg-white' classNames={{ content: 'font-bold' }} >{`${item.statusStimate === STATUS_TASK.ESTIMATE ? 'Completado' : 'Pendiente'}`}</Chip>
								}

							</div>
							{isAdmin &&
								<div className='space-x-2 invisible group-hover:visible'>
									<Popover
										key="opaque"
										showArrow
										offset={10}
										placement="bottom"
										backdrop='blur'
										isOpen={isOpenPop} onOpenChange={(open) => setIsOpen(open)}
									>
										<PopoverTrigger>
											<Button color="danger" className='bg-white' isIconOnly size='sm' radius='full' variant="light">
												<MdDeleteOutline className="text-base" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-72 flex items-center justify-center flex-col px-2 py-4">
											<h3 className='font-bold text-xs text-center'>¿Estas seguro de eliminar esta tarea?</h3>
											<div className='flex items-center justify-center gap-3 mt-3'>
												<Button size="sm" color='danger' onClick={handleDeleteTask} isLoading={loadingDeleteTask} variant="ghost">Si</Button>
												<Button size="sm" color='primary' onClick={() => setIsOpen(!isOpen)} variant="flat">No</Button>
											</div>
										</PopoverContent>
									</Popover>

								</div>
							}
						</div>

						<div className='flex flex-col pt-2'>
							<span onClick={onOpen} className='text-xs cursor-pointer hover:underline font-medium truncate pb-1'>{`${item.title}`}</span>
						</div>

						<div className='flex items-center justify-between mt-2'>
							<div className='space-x-2 flex items-center'>

								{
									item.statusStimate === STATUS_TASK.PENDING ?
										<Chip onClick={handleSelectTask} isDisabled={!isAdmin} size="sm" variant='flat' classNames={{ content: 'text-xs cursor-pointer', base: 'hover:bg-white hover:ring-2 transition-all bg-white dark:bg-default dark:ring-2 dark:ring-secondary-400 hover:ring-secondary-400' }} startContent={<IoPlayOutline />}>Empezar</Chip> :
										<Chip onClick={handleSelectTask} isDisabled={!isAdmin} size="sm" variant='flat' classNames={{ content: 'text-xs cursor-pointer', base: 'hover:bg-white hover:ring-2 transition-all  bg-white dark:bg-default dark:ring-2 dark:ring-secondary-400 hover:ring-secondary-400' }} startContent={<IoReload />}>Reiniciar</Chip>
								}
							</div>

							<Popover
								isOpen={isOpenPopCard}
								onOpenChange={(open) => isAdmin ? setIsOpenPopCard(open) : null}
								isKeyboardDismissDisabled={true}
								shouldCloseOnBlur={true} backdrop='opaque'
								placement="left" showArrow={true}
								radius='sm'
								className='dark:bg-background dark:ring-2 dark:ring-default'
								triggerScaleOnOpen={true}>
								<PopoverTrigger>
									<Input
										disabled={!isAdmin}
										type="text"
										size='sm'
										value={item.stimatePoint as any}
										classNames={{ inputWrapper: 'bg-white dark:bg-default', input: 'text-xs text-center' }}
										variant="faded"
										className=" max-w-[35px] text-xs"
									/>
								</PopoverTrigger>
								<PopoverContent>
									<h3 className='text-left text-xs mt-2 dark:text-white/80'>Seleccione una carta</h3>
									<Divider orientation='horizontal' className='my-2' />
									<div className='grid grid-cols-6 gap-3 p-2'>
										{
											SYSTEM_CARD[systemCard].map((row: { label: string, value: number }, index: number) => <span onClick={() => handleSaveEstimate(row.value)} className={`w-6 h-10 rounded-md  cursor-pointer hover:ring-2 hover:ring-secondary-200 dark:bg-default hover:font-bold flex items-center justify-center text-xs font-medium ${item?.stimatePoint?.toString() === row.value.toString() ? 'shadow-avatar-active' : 'shadow-avatar-inactive dark:shadow-none'}`} key={index}>{row.label}</span>)
										}
									</div>
								</PopoverContent>
							</Popover>

						</div>
					</div>
				</div>
			</div>
			<Details isOpen={isOpen} onOpenChange={onOpenChange} item={item} />

		</>
	);
}

export default Items
