/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Chip, Tab, Tabs } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux';

import 'core-js/actual/array/group-by'
import CardList from './components/CardList';

const CardTaskManual = () => {
	const planning: any = useSelector(selectInfoPlanning);

	const [listTaskPending, setListTaskPending] = useState<any[]>([])

	useEffect(() => {
		setListTaskPending(planning.task)
	}, [planning]);


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
					<CardList idList="pendding" data={listTaskPending} setData={(values) => setListTaskPending(values)} />
				</Tab>
			</Tabs>

		</Card>
	)
}

export default CardTaskManual
