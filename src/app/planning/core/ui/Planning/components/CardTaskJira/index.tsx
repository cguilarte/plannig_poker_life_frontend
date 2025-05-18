/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CheckboxGroup, Chip, Tab, Tabs } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import CardList from './CardList'
import tasks from '../../../../../../../assets/issues.json';
import { useSelector } from 'react-redux';
import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux';
import { tabTaksCount } from '@/app/planning/core/infrastructure/utils';
import { IIssues } from '@/app/plannings/core/domain/interfaces';

import 'core-js/actual/array/group-by'
import { CustomCheckbox } from '@/components/CustomCheckbox/CustomCheckbox';

const CardTaskJira = () => {
	const planning: any = useSelector(selectInfoPlanning);

	//const { taskPending, taskEstimate, taskPendingCount, taskEstimateCount } = tabTaksCount(planning.task);
	const [listTaskPending, setListTaskPending] = useState<any[]>([])
	//const [listTaskEstimate, setListTaskEstimate] = useState<IIssues[] | []>(taskEstimate)

	const [groupSelected, setGroupSelected] = useState<any>([]);
	const [listProjectsTask, setListProjectsTask] = useState<string[]>([]);
	const [listIssuesProject, setListIssuesProject] = useState<any>({});



	useEffect(() => {
		setListTaskPending(planning.task)
		if (planning.task.length > 0) {

			const result = planning.task.groupBy((task: any) => task.project.name);
			if (result) {
				setListIssuesProject(result);
				setListProjectsTask(Object.keys(result))
			}
		}
	}, [planning]);

	useEffect(() => {

		if (groupSelected.length === 0) {
			setListTaskPending(planning.task)
		} else {

			let listTasks: any[] = [];

			groupSelected.forEach((row: string) => {
				listTasks = [...listTasks, ...listIssuesProject[row]]
			});

			setListTaskPending(listTasks);
		}
	}, [groupSelected])



	return (
		<Card radius='sm' className='bg-white dark:bg-[#304156] border-none shadow-none'>

			<Tabs
				aria-label="tasks"
				color="primary"
				variant="underlined"
				classNames={{
					tabList: "w-full relative rounded-none p-0 border-b border-divider",
					cursor: "w-full bg-primary dark:bg-white",
					tab: "max-w-fit px-0 h-12 m-0",
					tabContent: "group-data-[selected=true]:text-primary font-bold",
					panel: 'py-0'
				}}
			>
				<Tab
					key="pending"
					className='px-0'
					title={
						<div className="flex items-center space-x-2 pl-4">
							<span className='dark:text-white'>Tareas</span>
							<Chip size="sm" classNames={{ base: 'text-xs' }} variant="faded">{listTaskPending.length}</Chip>
						</div>
					}
				>

					<div className="flex flex-col gap-1 w-full px-4 py-2 bg-[#F7F8F9] shadow-lg dark:bg-[#1C2936] mb-4">
						{listProjectsTask.length > 0 &&
							<CheckboxGroup
								className="gap-1"
								orientation="horizontal"
								classNames={{ label: 'text-xs font-bold dark:text-white text-black pb-1', base: 'text-xs' }}
								value={groupSelected}
								onChange={setGroupSelected}
							>
								{listProjectsTask.map((item: string, index: number) => <CustomCheckbox key={index} value={item}>{item}</CustomCheckbox>)}
							</CheckboxGroup>
						}
					</div>


					<CardList idList="pendding" data={listTaskPending} setData={(values) => setListTaskPending(values)} />

				</Tab>
				{/* <Tab
					key="done"
					title={
						<div className="flex items-center space-x-2">
							<span>Tareas estimadas</span>
							<Chip size="sm" classNames={{ base: 'text-xs' }} variant="faded">{taskEstimateCount}</Chip>
						</div>
					}
				>
					<CardList idList="estimate" data={listTaskEstimate} setData={(values: any) => setListTaskEstimate(values)} />

				</Tab> */}

			</Tabs>

		</Card>
	)
}

export default CardTaskJira
