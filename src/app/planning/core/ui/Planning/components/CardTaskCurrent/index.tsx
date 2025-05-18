import { setTaskCurrent } from '@/app/planning/core/infrastructure/redux'
import { IIssues, ITask } from '@/app/plannings/core/domain/interfaces'
import { useAppDispatch } from '@/infrastructure/hooks/store'
import { Chip, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Details from './Details'
import { useTheme } from 'next-themes'
import { LuMinusCircle } from 'react-icons/lu'

const CardTaskCurrent = ({ taskCurrent }: IIssues | ITask | any) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { theme } = useTheme()

	const dispatch = useAppDispatch();
	const task: IIssues | ITask | any = taskCurrent;

	const handleRemoveTask = () => {
		dispatch(setTaskCurrent(null));
	}

	return (
		<>
			<div className={`w-full flex items-center justify-center pt-0 transition-all hover:scale-105 cursor-pointer ${task ? 'visible' : 'invisible'}`}>
				<div className=' rounded-lg bg-white dark:bg-default py-1 px-2 flex items-center text-xs space-x-2 dark:space-x-0 shadow-md'>
					<Chip color='primary' size='sm' className='mr-2 font-bold text-xs' variant={theme === 'dark' ? 'light' : 'flat'} startContent={<FiExternalLink />}>{task?.key}</Chip>
					<span onClick={onOpen} className='hover:underline pr-4 block'>{task?.title}</span>
					<LuMinusCircle onClick={handleRemoveTask} className=" text-red-700 dark:text-white text-lg  transition-all hover:scale-125 cursor-pointer" />
				</div>
			</div>
			<Details isOpen={isOpen} onOpenChange={onOpenChange} item={task} />

		</>
	)
}

export default CardTaskCurrent
