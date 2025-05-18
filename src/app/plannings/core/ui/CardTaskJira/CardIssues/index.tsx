import { IIssues, ITask } from '@/app/plannings/core/domain/interfaces'
import React from 'react'
import Items from './Items'

interface Iprops {
	data: IIssues[],
	tasks: [] | ITask[] | IIssues[],
	onAdd: (value: IIssues) => void
	onDelete: (value: IIssues) => void
}

const CardIssues = ({ data, tasks, onAdd, onDelete }: Iprops) => {

	return (
		<>
			{data.length > 0 && data.map((item: IIssues, index: number) => {
				const hasTaskAdd: number = tasks.findIndex((row: any) => row.key === item.key) || 0;
				return <Items key={item.id} hasAdd={hasTaskAdd === -1} index={index} tasks={tasks} onDelete={onDelete} item={item} onAdd={onAdd} />

			})}
		</>
	)
}

export default CardIssues
