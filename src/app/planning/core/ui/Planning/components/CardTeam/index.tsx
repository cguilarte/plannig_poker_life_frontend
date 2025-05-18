import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux'
import { Card, Divider } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'

const CardTeam = () => {

	const planning: any = useSelector(selectInfoPlanning);

	return (
		<Card radius='sm' className='bg-white border-none shadow-none'>

			<div className='flex items-start flex-col w-full'>
				<div className='flex items-center justify-between w-full'>
					<h3 className='text-primary font-bold'>Teams</h3>
					{/* 								<Link href="#" size='sm' color='danger' className='underline'>Reiniciar story points</Link>
 */}							</div>
				<Divider className='my-2' />
			</div>

			<div className='grid grid-cols-2 p-0 gap-3'>
				{planning.teampoints.length > 0 && planning.teampoints.map((row: any, index: number) => {
					return (
						<Card key={index} radius='sm' shadow='none' className='p-2 flex-col flex items-center justify-center bg-secondary-100/40'>
							<p className='text-sm font-medium pb-0'>{row.team.name}</p>
							<div className='flex items-center space-x-1'>
								<span className='text-xs font-normal text-secondary-300'>Story Point</span>
								<span className='text-xs text-secondary-400 font-bold'>{row.storyPoint}</span>
							</div>
						</Card>
					)
				})}

			</div>

		</Card>
	)
}

export default CardTeam
