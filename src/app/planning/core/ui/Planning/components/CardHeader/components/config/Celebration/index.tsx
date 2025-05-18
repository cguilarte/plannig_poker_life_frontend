import { selectControlCelebration, selectControlPlanning, selectInfoPlanning } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { Switch, Tooltip } from '@nextui-org/react'
import React from 'react'
import { MdOutlineCelebration, MdOutlineMotionPhotosOff } from 'react-icons/md';
import { TbUserShield, TbUsersGroup } from "react-icons/tb";

const Celebration = () => {
	// TODO: Crear interfaces
	const control: any = useAppSelector(selectControlCelebration);
	const { planningId }: any = useAppSelector(selectInfoPlanning);
	const { sendControlCelebration } = servicesPlanningLive.controlCelebration();

	const handleSwitMode = (value: boolean) => {
		sendControlCelebration({
			variables: {
				planningId,
				control: !value
			}
		})
	}
	return (
		<>
			<Switch
				onValueChange={(value: boolean) => handleSwitMode(!value)}
				defaultSelected={control}
				size="sm"
				color='primary'

				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<MdOutlineMotionPhotosOff className={className} />

					) : (
						<MdOutlineCelebration className={className} />
					)}
			>
				<Tooltip key='bottom' color='secondary' placement='bottom' content={`Celebración`}></Tooltip>
			</Switch>
		</>
	)
}

export default Celebration
