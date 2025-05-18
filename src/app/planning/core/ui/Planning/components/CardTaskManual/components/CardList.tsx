/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Items from './items';
import Image from 'next/legacy/image';
import { ITask } from '@/app/plannings/core/domain/interfaces';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { selectTaskCurrent } from '@/app/planning/core/infrastructure/redux';
import isAdminPlanning from '@/infrastructure/hooks/IsAdminPlanning';

interface IProps {
	data: [] | ITask[];
	setData: (issues: [] | ITask[] | any[]) => void;
	idList: String;
}

const CardList = ({ data, setData, idList }: IProps) => {
	const currentTask: any = useAppSelector(selectTaskCurrent);
	const isControl = isAdminPlanning();


	const onDragEnd = (result: any) => {
		if (!isControl) return;
		if (!result.destination) return;
		const newItems = Array.from(data);
		const [removed] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, removed);
		setData(newItems);
	};

	const taskRefs: any = useRef([]);

	const setRef = useCallback((ref: any, index: any) => {
		if (ref) {
			taskRefs.current[index] = ref;
		}
	}, []);

	useEffect(() => {
		if (currentTask) {
			const nextTaskIndex = data.findIndex((item: any) => item._id === currentTask._id);
			if (nextTaskIndex < taskRefs.current.length) {
				taskRefs.current[nextTaskIndex]?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
		}
	}, [currentTask]);


	return (
		<div className='flex flex-col'>

			{data.length === 0 &&
				<div className='w-full h-auto flex items-center justify-center mt-4'>
					<div className='relative w-48 h-36 opacity-80'>
						<Image src="/img/task-list.svg" objectFit='cover' layout='fill' alt='Not found' />
					</div>
				</div>
			}

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable isDropDisabled={!isControl} droppableId={`droppables_task_${idList}`}>
					{(provided: any) => (
						<div {...provided.droppableProps} ref={provided.innerRef}
							className='flex flex-col space-y-4 pb-2 h-[72vh] overflow-y-scroll mt-4'>
							{data.map((item: ITask, index) => (
								<Draggable isDragDisabled={!isControl} key={item.key} draggableId={item.key.toString()} index={index}>
									{(provided: any, snapshot: any) => (
										<div
											ref={(ref) => {

												setRef(ref, index)
												return provided.innerRef(ref);
											}}
											/* ref={(ref: any) => {
												provided.innerRef(ref);
												taskRefs.current[index] = ref;
											}} */
											snapshot={snapshot}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Items
												key={item.key}
												snapshot={snapshot}
												item={item}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default CardList
