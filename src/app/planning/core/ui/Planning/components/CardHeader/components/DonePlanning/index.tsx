import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { useAppSelector } from '@/infrastructure/hooks/store'
import { Button, Divider, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { AiOutlineFileDone } from 'react-icons/ai'
import { FiCheckSquare } from 'react-icons/fi'

const DonePlanning = () => {
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
					fieldStoryPoint: storyPoint
				}
			}
		})
	}


	return (
		<Popover shouldCloseOnBlur={true} placement="bottom" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} backdrop='blur' offset={20} showArrow>
			<PopoverTrigger>
				<Button size="sm" color='success' className='bg-white text-sm dark:bg-default dark:text-white' variant='bordered' startContent={<AiOutlineFileDone className="text-lg dark:text-white" />}>Finalizar</Button>
			</PopoverTrigger>
			<PopoverContent >
				<div className=" flex flex-col px-1 py-2">
					<h2 className='font-bold text-sm'>Finalizar Planning</h2>
					<p className='text-xs text-secondary-400 dark:text-white/80'>Jira Settings</p>
					<Divider orientation='horizontal' className='my-2' />

					<div className='flex flex-col space-y-4 mt-4'>
						<Select
							size='sm'
							label="Campo de estimación de puntos de historia (Opcional)"
							placeholder="Seleccione el campo para la estimación"
							selectionMode='single'
							className="max-w-md"
							onChange={(e) => setStoryPoint(e.target.value)}
							classNames={{ description: 'text-[10px] pt-1 leading-4' }}
							description='** Asegúrate de que estás seleccionando el campo correcto. Si la sincronización no funciona, es probable que hayas seleccionado el campo equivocado. Asegúrate de que el nombre y el tipo de campo coincidan con lo que se muestra en tu ticket de Jira.'
						>
							{result.length > 0 && result.map((item: any) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
						</Select>
						<div className=''>
							<Button isDisabled={loading} isLoading={loading} onClick={handleFinalizarPlanning} size="sm" color='primary' variant='solid' startContent={<FiCheckSquare className="text-lg dark:text-white" />}>Finalizar planning</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default DonePlanning