/* eslint-disable @next/next/no-img-element */
import { Button, Chip, Link, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react'
import { BiMinus } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { RxDragHandleDots2 } from 'react-icons/rx';
import ItemSubtask from '../CardIssues/ItemSubtask';
import { IIssues } from '../../../domain/interfaces';

const Items = ({ item, provided, snapshot, onDelete }: any) => {
	const [openSubtrask, setOpenSubTask] = useState(false);

	return (
		<>
			<div
				ref={provided.innerRef}
				snapshot={snapshot}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
			>
				<div className={`grid grid-cols-12 items-center justify-between bg-primary-100/50  px-2 py-1 rounded-lg hover:cursor-move border-dashed  ${snapshot.isDragging ? 'border border-primary' : 'border border-primary-300'}`}>
					<div className='flex items-center flex-row col-span-11'>
						<RxDragHandleDots2 className="text-sm mr-1" />
						<img width={20} height={20} alt='logo' className=' rounded-full' src={item.issuetype.iconUrl} />
						<div className='flex flex-col pl-2 w-[90%] '>
							<span className='text-xs font-bold text-secondary-400 truncate pb-1'>{`${item.key} ${item.title}`}</span>
							<div className='flex items-center flex-row space-x-2'>
								<Chip size="sm" classNames={{ content: 'text-[10px]', base: 'p-0 px-1  h-4 bg-[#e8e8f4]' }}>{item.project.name}</Chip>
							</div>
						</div>
					</div>
					<div className='flex items-center justify-end space-x-2 col-span-1'>
						{item.subtasks.length > 0 &&
							<Tooltip classNames={{ base: 'text-xs' }} content="Ver lista de subtareas">
								<Link onPress={() => setOpenSubTask(!openSubtrask)} showAnchorIcon anchorIcon={openSubtrask ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />} className=' bg-white  ring-1 cursor-pointer rounded-xl  py-1 px-2 text-xs' size='sm' color='secondary'>
									Subtareas
								</Link>
							</Tooltip>
						}
						<Tooltip classNames={{ base: 'text-xs' }} content="Eliminar tarea de la lista.">
							<Button onClick={() => onDelete(item)} color="default" size='sm' radius='full' isIconOnly data-hover="border-solid-2 !border-green-500" className='bg-white hover:border-solid-2 hover:!border-red-500' variant="bordered">
								<BiMinus />
							</Button>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className={`w-[99%] mx-auto rounded-md p-4 bg-[#ddd]/20 my-2 space-y-2 ${openSubtrask ? '' : 'hidden'}`}>
				{item.subtasks.length > 0 && item.subtasks.map((row: IIssues, index: number) => {
					return <ItemSubtask index={index} key={row.id} item={row} />
				})}
			</div>
		</>
	);
}

export default Items
