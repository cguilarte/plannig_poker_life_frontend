import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IIssues, ITask } from '../../../domain/interfaces';
import Items from './items';
import Image from 'next/legacy/image';

interface IProps {
	data: [] | ITask[] | IIssues[];
	setData: (issues: [] | ITask[] | IIssues[] | any[]) => void;
	setDataDefault: React.Dispatch<React.SetStateAction<[] | IIssues[] | any[]>>;

}

const CardIssuesAdd = ({ data, setData, setDataDefault }: IProps) => {

	const onDragEnd = (result: any) => {
		if (!result.destination) return;
		const newItems = Array.from(data as any);
		const [removed] = newItems.splice(result.source.index, 1);
		newItems.splice(result.destination.index, 0, removed);
		setData(newItems);
	};

	const onDelete = (item: IIssues) => {
		setData(data.filter((row: any) => row.key !== item.key));
		//setDataDefault((items) => [...items, item]);
	}

	return (
		<div className='flex flex-col'>

			{data.length === 0 &&
				<div className='w-full flex items-center justify-center mt-4'>
					<div className='relative w-48 h-48'>
						<Image src="/img/no-search-result.svg" objectFit='cover' layout='fill' alt='Not found' />
					</div>
				</div>
			}


			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppables">
					{(provided: any) => (
						<div {...provided.droppableProps} ref={provided.innerRef}
							className='flex flex-col space-y-2 h-auto pb-2 mb-8 overflow-y-scroll'>
							{data.map((item: any, index) => (
								<Draggable key={item.key} draggableId={item.key.toString()} index={index}>
									{(provided: any, snapshot: any) => (
										<Items
											snapshot={snapshot}
											provided={provided}
											item={item}
											onDelete={onDelete}
										/>
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

export default CardIssuesAdd
