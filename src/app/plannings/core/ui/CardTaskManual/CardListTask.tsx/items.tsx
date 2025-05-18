/* eslint-disable @next/next/no-img-element */
import { ITask } from '@/app/plannings/core/domain/interfaces';
import { Button, Chip, Tooltip } from '@nextui-org/react';
import React from 'react'
import { BiMinus } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface IProps {
	item: ITask;
	provided: any;
	snapshot: any;
	onDelete: any;
}

const Items = ({ item, provided, snapshot, onDelete }: IProps) => {
	return (
		<div
			ref={provided.innerRef}
			snapshot={snapshot}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<div className={`grid grid-cols-12 items-center justify-between bg-primary-100/50  px-2 py-1 rounded-lg hover:cursor-move border-dashed  ${snapshot.isDragging ? 'border border-primary' : 'border border-primary-300'}`}>
				<div className='flex items-center flex-row col-span-11'>
					<RxDragHandleDots2 className="text-sm mr-1" />
					<div className='flex flex-col pl-2 w-[90%] '>
						<span className='text-xs font-bold text-secondary-400 truncate'>{`${item.title}`}</span>
						<span className='text-xs p-0 truncate'>{item.description || '-'}</span>
					</div>
				</div>
				<div className='flex items-center justify-end space-x-2 col-span-1'>
					<Tooltip classNames={{ base: 'text-xs' }} content="Eliminar tarea de la lista.">
						<Button onClick={() => onDelete(item)} color="default" size='sm' radius='full' isIconOnly data-hover="border !border-red-500" className='bg-white hover:border-solid-2 hover:text-red-500 hover:!border-red-500' variant="bordered">
							<BiMinus />
						</Button>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default Items
