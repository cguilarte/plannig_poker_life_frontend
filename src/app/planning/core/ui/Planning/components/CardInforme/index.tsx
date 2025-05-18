import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux';
import { tabTaksCount } from '@/app/planning/core/infrastructure/utils';
import { STATUS_PLANNING } from '@/app/plannings/core/domain/interfaces';
import { STATUS_TASK } from '@/app/plannings/core/domain/planningData';
import { Card, Divider, Progress } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux';

const CardInforme = () => {
	const planning: any = useSelector(selectInfoPlanning);

	const { taskPendingCount, taskEstimateCount, porcentaje } = tabTaksCount(planning.task);


	return (
		<Card radius='sm' className='border-none absolute bottom-5 left-5 dark:bg-[#141B24]'>
			<div className='flex items-center py-2 px-2  h-20' >

				<div className='flex flex-col justify-center items-center'>
					<strong className='font-medium text-lg'>{taskPendingCount}</strong>
					<span className='uppercase text-[10px] font-medium text-secondary-300 text-center leading-none'>TAREAS POR <br /> ESTIMAR</span>
				</div>

				<Divider orientation="vertical" className='mx-4 text-secondary-400' />

				<div className='flex flex-col justify-center items-center'>
					<strong className='font-medium text-lg'>{taskEstimateCount}</strong>
					<span className='uppercase text-[10px] font-medium text-green-600 text-center leading-none'>TAREAS <br />COMPLETADAS</span>
				</div>

				<Divider orientation="vertical" className='mx-4' />

				<div className='flex flex-col w-28'>
					<Progress
						classNames={{
							label: "text-foreground/60 text-xs",
							value: "text-foreground/60 text-xs mb-0 font-bold",
						}}
						showValueLabel={true}
						size="lg"
						color='success'
						aria-label="Loading..."
						label="Progreso"
						value={porcentaje} />
				</div>

			</div>
		</Card>
	)
}

export default CardInforme
