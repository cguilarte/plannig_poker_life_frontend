import { selectControlPlanning, selectInfoPlanning } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { Switch, Tooltip } from '@nextui-org/react'
import React from 'react'
import { TbUserShield, TbUsersGroup } from "react-icons/tb";

const Control = () => {
	// TODO: Crear interfaces
	const control: any = useAppSelector(selectControlPlanning);
	const { planningId }: any = useAppSelector(selectInfoPlanning);
	const { sendControlPlanning } = servicesPlanningLive.controlPlanning();

	const handleSwitMode = (value: boolean) => {
		sendControlPlanning({
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
						<TbUsersGroup className={className} />

					) : (
						<TbUserShield className={className} />
					)}
			>
				<Tooltip key='bottom' color='secondary' placement='bottom' content={`Control de sala`}></Tooltip>
			</Switch>
		</>
	)
}

export default Control
