import { selectGuest, selectInfoPlanning, selectPlanningId, selectResult, selectShowCard, selectTaskCurrent, selectTeamPoint, selectVotos } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { SYSTEM_CARD } from '@/app/planning/core/infrastructure/utils'
import isAdminPlanning from '@/infrastructure/hooks/IsAdminPlanning'
import { useAppSelector } from '@/infrastructure/hooks/store'
import { Button, Divider, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const Result = () => {
	const planningId = useAppSelector(selectPlanningId);
	const result: any = useAppSelector(selectResult);
	const [storyPoint, setStoryPoint] = useState(0);
	const { handleNewVoto } = servicesPlanningLive.newVoto();
	const { systemCard }: any = useAppSelector(selectInfoPlanning);
	const task: any = useAppSelector(selectTaskCurrent);
	const { theme } = useTheme()
	const isControl = isAdminPlanning();

	const [isOpenUpdatPoint, setUpdatePoint] = useState<boolean>(false);

	const { updateTask, loading } = servicesPlanningLive.updateTask()
	const votos: any = useAppSelector(selectVotos);
	const guests: any = useAppSelector(selectGuest);

	const handleSaveEstimate = () => {

		let listVotos: any[] = [];

		for (let [key, value] of Object.entries(votos)) {
			const voto: any = value;
			const guest: any = guests.find((item: any) => item._id === key);

			listVotos.push({
				taskId: task._id,
				guestId: guest._id,
				planningId,
				teamId: guest.team._id,
				voto: parseFloat(voto.value)
			});

		}

		let bodyData: any = {
			planningId,
			stimatePoint: storyPoint,
			newVoto: true,
			votos: listVotos
		}

		bodyData = task.__typename === 'ISubtaskJira' ? { ...bodyData, taskId: task.taskId, subtaskId: task._id } : bodyData = { ...bodyData, taskId: task._id, subtaskId: null }


		updateTask({
			variables: { ...bodyData }
		})
	}

	const handleVoto = () => {
		handleNewVoto({
			variables: {
				planningId
			}
		})
	}

	const handleUpdateStoryPoint = (point: number) => {
		setStoryPoint(point);
		setUpdatePoint(!isOpenUpdatPoint);
	}

	useEffect(() => {
		if (result.estimatedValues) {
			//const voto = result.estimatedValues && result.estimatedValues.slice(0, 3).sort((a: any, b: any) => b.value - a.value)[0]
			//setStoryPoint(parseInt(voto.key));
			setStoryPoint(parseInt(result.mostVoted));

		}
	}, [result])


	return (
		<>
			<div className='flex items-center justify-center'>
				{result.estimatedValues &&
					<div className='flex items-center  space-x-4 mr-6'>
						{result.estimatedValues && result.estimatedValues.slice(0, 3).sort((a: any, b: any) => b.value - a.value).map((row: any, index: number) => {
							/* if (index === 0) {
								return (
									<Popover className='dark:bg-background dark:ring-2 dark:ring-default' isKeyboardDismissDisabled={true} shouldCloseOnBlur={true} backdrop='opaque' key={index} placement="bottom" showArrow={true} radius='sm' triggerScaleOnOpen={true}>
										<PopoverTrigger>
											<div key={index} onClick={() => setUpdatePoint(!isOpenUpdatPoint)} className={`flex flex-col justify-center items-center space-y-1 cursor-pointer`}>
												<div className={` bg-white dark:border-default/50 dark:bg-background flex items-center justify-center rounded-md text-xs font-bold w-10 h-16 ring-2 ring-secondary-400 dark:ring-background`}>{storyPoint}</div>
												<span className='text-xs font-bold text-secondary-400 dark:text-white/80'>{row.value} votos</span>
											</div>
										</PopoverTrigger>
										<PopoverContent>
											<h3 className='text-left text-xs mt-2 dark:text-white/80'>Seleccione una carta</h3>
											<Divider orientation='horizontal' className='my-2' />
											<div className='grid grid-cols-6 gap-3 p-2'>
												{
													SYSTEM_CARD[systemCard].map((item: { label: string, value: number }, index: number) => <span onClick={() => handleUpdateStoryPoint(item.value)} className={`w-6 h-10 rounded-md dark:bg-default cursor-pointer hover:ring-2 hover:ring-secondary-200 hover:font-bold flex items-center justify-center text-xs font-medium ${storyPoint.toString() === item.value.toString() ? 'shadow-avatar-active' : 'shadow-avatar-inactive dark:shadow-none'}`} key={index}>{item.label}</span>)
												}
											</div>
										</PopoverContent>
									</Popover>
								)
							} */

							return (
								<div key={index} className={`flex flex-col justify-center items-center space-y-1 opacity-60}`}>
									<div className={` bg-white dark:bg-default-50/30 flex items-center justify-center rounded-md text-xs w-8 h-12 border-1 border-solid  border-secondary-400`}>{row.key}</div>
									<span className='text-xs font-bold text-secondary-400 dark:text-white/30'>{row.value} votos</span>
								</div>
							)
						})}
					</div>
				}



				<Popover className='dark:bg-background dark:ring-2 dark:ring-default' isKeyboardDismissDisabled={true} shouldCloseOnBlur={true} backdrop='opaque' placement="bottom" showArrow={true} radius='sm' triggerScaleOnOpen={true}>
					<PopoverTrigger>
						<div onClick={() => setUpdatePoint(!isOpenUpdatPoint)} className='rounded-full w-20 h-20 overflow-hidden flex-col bg-white dark:border-2 dark:border-default/50 dark:bg-background shadow-md flex items-center justify-center'>
							<strong className='text-2xl font-bold text-green-600'>{storyPoint || 0}</strong>
							<span className='text-xs font-light text-secondary-400 dark:text-white/80 relative -top-1 leading-3 text-center'>Votación estimada</span>
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<h3 className='text-left text-xs mt-2 dark:text-white/80'>Seleccione una carta</h3>
						<Divider orientation='horizontal' className='my-2' />
						<div className='grid grid-cols-6 gap-3 p-2'>
							{
								SYSTEM_CARD[systemCard].map((item: { label: string, value: number }, index: number) => <span onClick={() => handleUpdateStoryPoint(item.value)} className={`w-6 h-10 rounded-md dark:bg-default cursor-pointer hover:ring-2 hover:ring-secondary-200 hover:font-bold flex items-center justify-center text-xs font-medium ${storyPoint.toString() === item.value.toString() ? 'shadow-avatar-active' : 'shadow-avatar-inactive dark:shadow-none'}`} key={index}>{item.label}</span>)
							}
						</div>
					</PopoverContent>
				</Popover>


				<div className='flex flex-col items-center justify-center ml-4'>
					<span className='text-2xl font-bold text-secondary-400 dark:text-white'>{result.estimationCount || 0}</span>
					<span className='text-xs font-light text-secondary-400 relative dark:text-white/80 -top-1'>Votos Totales</span>
				</div>

			</div>

			<div className='flex items-center mt-4 space-x-4'>
				<Button size="sm" color='warning' isDisabled={!isControl} className={theme === 'dark' ? 'text-white' : 'text-black'} variant={theme === 'dark' ? 'ghost' : 'bordered'} radius='full' onClick={handleVoto}>Iniciar nueva votación</Button>
				{task && <Button size="sm" isDisabled={!isControl} color='primary' variant={theme === 'dark' ? 'solid' : 'solid'} radius='full' onClick={handleSaveEstimate}>Guardar Estimación</Button>}
			</div>
		</>
	)
}

export default Result
