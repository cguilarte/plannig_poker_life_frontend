import { selectInfoPlanning, selectProfile, setProfile } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { useAppDispatch, useAppSelector } from '@/infrastructure/hooks/store';
import { Button, Switch, Tooltip } from '@nextui-org/react'
import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Modo = () => {
	const dispatch = useAppDispatch();

	// TODO: Crear interfaces
	const currentProfile: any = useAppSelector(selectProfile);
	const { planningId }: any = useAppSelector(selectInfoPlanning);
	const { updateTemporal } = servicesPlanningLive.updateGuestTemporal(onSuccess);

	function onSuccess(data: any) {
		const status = data.updateGuestTemporal
		if (status) {
			const guest = { ...currentProfile }
			const modeObserver = !guest.modeObserver;
			dispatch(setProfile({ ...guest, modeObserver }));
		}
	}

	const handleSwitMode = (value: boolean) => {
		updateTemporal({
			variables: {
				data: {
					planningId,
					modeObserver: value
				},
				guestId: currentProfile._id
			}
		})
	}
	return (
		<>
			<Switch
				onValueChange={handleSwitMode}
				defaultSelected={currentProfile.modeObserver}
				size="sm"
				color='primary'

				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<AiOutlineEye className={className} />

					) : (
						<AiOutlineEyeInvisible className={className} />
					)}
			>
				<Tooltip key='bottom' color='secondary' placement='bottom' content={`Cambiar al modo ${currentProfile.modeObserver ? 'Jugardor' : 'Observador'}`}></Tooltip>
			</Switch>
		</>
	)
}

export default Modo
