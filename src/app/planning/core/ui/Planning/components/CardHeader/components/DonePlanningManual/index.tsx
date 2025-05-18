import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { useAppSelector } from '@/infrastructure/hooks/store'
import { Button, Divider, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { FiCheckSquare } from 'react-icons/fi'

const DonePlanningManual = () => {
	const { planningId }: any = useAppSelector(selectInfoPlanning);
	const { result } = servicesPlanningLive.getResourcesJira(planningId);
	const [storyPoint, setStoryPoint] = useState<string>('customfield_10027');
	const [isOpen, setIsOpen] = React.useState(false);
	const { modalDone, loading } = servicesPlanningLive.donePlanning((result: any) => setIsOpen(false));


	const handleFinalizarPlanning = () => {
		modalDone({
			variables: {
				data: {
					planningId,
				}
			}
		})
	}


	return (
		<Popover shouldCloseOnBlur={true} placement="bottom" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} backdrop='blur' offset={20} showArrow>
			<PopoverTrigger>
				<Button size="sm" color='success' className='bg-white text-sm dark:bg-default dark:text-white' variant='bordered' startContent={<AiOutlineFileDone className="text-lg dark:text-white" />}>Finalizar</Button>
			</PopoverTrigger>
			<PopoverContent className="w-72 flex items-center justify-center flex-col px-2 py-4">
				<h3 className='font-bold text-xs text-center'>¿Estas seguro de finalizar la planning?</h3>
				<div className='flex items-center justify-center gap-3 mt-3'>
					<Button size="sm" color='danger' isLoading={loading} onClick={() => handleFinalizarPlanning()} variant="ghost">Si</Button>
					<Button size="sm" color='primary' variant="flat" onClick={() => setIsOpen(false)}>No</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default DonePlanningManual