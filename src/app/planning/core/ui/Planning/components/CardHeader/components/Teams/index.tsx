import { selectInfoPlanning, selectTeamPoint } from '@/app/planning/core/infrastructure/redux';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { Button, Card, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React from 'react'
import { FaUsersLine } from 'react-icons/fa6'

const Teams = () => {
	const teampoints: any[] = useAppSelector(selectTeamPoint);

	return (
		<>
			<Popover placement="bottom" backdrop='blur' offset={20} showArrow>
				<PopoverTrigger>
					<Button size="sm" color='primary' className='bg-white text-sm dark:bg-default dark:text-white' variant='flat' startContent={<FaUsersLine className="text-lg dark:text-white" />}>Teams</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className=" flex flex-col px-1 py-2">
						<h2 className='font-bold text-sm'>Teams story point</h2>
						<p className='text-xs text-secondary-400 dark:text-white/80'>Agrupación de las story point por equipos.</p>
						<Divider orientation='horizontal' className='my-2' />

						<div className='grid grid-cols-3 gap-3 mt-4'>
							{teampoints.length > 0 && teampoints.map((row: any, index: number) => {
								return (
									<Card key={index} radius='sm' shadow='none' className='p-2 flex-col flex items-center justify-center bg-secondary-100/40 dark:bg-default'>
										<p className='text-sm font-medium pb-0'>{row.name}</p>
										<div className='flex items-center space-x-1'>
											<span className='text-xs font-normal text-secondary-300'>Story Point</span>
											<span className='text-xs text-secondary-400 font-bold dark:text-white'>{row.point}</span>
										</div>
									</Card>
								)
							})}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default Teams
