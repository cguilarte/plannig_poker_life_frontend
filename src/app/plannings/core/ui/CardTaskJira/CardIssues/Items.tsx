'use client'
/* eslint-disable @next/next/no-img-element */
import { Button, Chip, Link, Tooltip, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { IIssues, ITask } from '../../../domain/interfaces'
import { BiMinus, BiPlus, BiSolidRightArrow, BiSolidUpArrow } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import Details from './Details'
import { CiBoxList } from 'react-icons/ci'
import ItemSubtask from './ItemSubtask'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

interface Iprops {
	item: IIssues,
	tasks: [] | ITask[] | IIssues[],
	hasAdd: boolean,
	onAdd: (value: IIssues) => void,
	onDelete: (value: IIssues) => void,
	index: number
}

const Items = ({ item, hasAdd, onAdd, tasks, index, onDelete }: Iprops) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [openSubtrask, setOpenSubTask] = useState(false);
	return (
		<>
			<div className={`grid grid-cols-12 items-center justify-between w-full rounded-sm ${index % 2 === 0 ? 'bg-[#F7F8F9]' : ''} ${openSubtrask ? '' : ''} p-2`}>
				<div className='flex items-center col-span-7'>
					<img width={20} height={20} alt='logo' className=' rounded-full' src={item.issuetype.iconUrl} />
					<div className='flex flex-col pl-2 w-full'>
						<span className='text-sm font-bold text-secondary-400 truncate pb-1'>{`${item.key} ${item.title}`}</span>

					</div>
				</div>
				<div className='flex items-center justify-end space-x-2 col-span-5'>

					<Chip size='sm' className='mr-4' classNames={{ content: 'text-xs' }} variant='flat'>{item.status.name}</Chip>

					{item.subtasks.length > 0 &&
						<Tooltip classNames={{ base: 'text-xs' }} content="Ver lista de subtareas">
							<Link onPress={() => setOpenSubTask(!openSubtrask)} showAnchorIcon anchorIcon={openSubtrask ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />} className=' bg-white  ring-1 cursor-pointer rounded-xl  py-1 px-2 text-xs' size='sm' color='secondary'>
								Subtareas
							</Link>
						</Tooltip>

					}
					<Tooltip classNames={{ base: 'text-xs' }} content="Ver detalle de la tarea">
						<Link onPress={onOpen} isBlock showAnchorIcon anchorIcon={<AiOutlineEye className="ml-1" />} className='bg-white ring-1 cursor-pointer rounded-xl py-1 px-2  text-xs' size='sm' color="primary">
							ver detalles
						</Link>
					</Tooltip>
					<Tooltip classNames={{ base: 'text-xs' }} content="Agregar a tareas">
						<Button onPress={() => hasAdd ? onAdd(item) : onDelete(item)} color="default" size='sm' radius='full' isIconOnly className='bg-none  hover:border-solid-2 hover:!border-green-500' variant="light">
							{hasAdd ? <MdCheckBoxOutlineBlank className=" text-xl" /> : <MdOutlineCheckBox className=" text-xl text-green-700" />}
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className={`relative py-2 ${openSubtrask ? '' : 'hidden'}`}>
				<BiSolidUpArrow className="text-xl absolute left-10 -top-2 text-[#F7F8F9] dark:text-[#1A1C25]" />

				<div className={`w-[99%] mx-auto rounded-md px-4 py-4 bg-[#F7F8F9] block space-y-2 `}>
					{item.subtasks.length > 0 && item.subtasks.map((row: IIssues, indexSub: number) => {
						const hasTaskAdd: number = tasks.findIndex((item: any) => item.key === row.key) || 0;
						return <ItemSubtask index={indexSub} key={row.id} item={row} />
					})}
				</div>
			</div>
			<Details isOpen={isOpen} onOpenChange={onOpenChange} item={item} />
		</>
	)
}

export default Items
