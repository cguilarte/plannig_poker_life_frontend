import { selectGuest, selectInfoPlanning, selectVotos } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import isAdminPlanning from '@/infrastructure/hooks/IsAdminPlanning'
import { useAppSelector } from '@/infrastructure/hooks/store'
import useAlert from '@/infrastructure/hooks/useAlert'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useSelector } from 'react-redux'

const RevealCard = () => {
	const { alertError } = useAlert();
	const { systemCard, planningId }: any = useSelector(selectInfoPlanning);
	const votos = useSelector(selectVotos);
	const { sendDataResult, loading } = servicesPlanningLive.resultPlanning();
	const isControl = isAdminPlanning();

	const handleResult = () => {
		if (Object.keys(votos).length === 0) {
			alertError('Aun no hay votos disponibles.');
			return false;
		}

		sendDataResult({
			variables: {
				data: {
					systemCard,
					planningId,
					votos: JSON.stringify(votos)
				}
			}
		})
	}

	return (
		<Button size='md' isDisabled={!isControl} type='button' onClick={handleResult} color='primary' radius='full' isLoading={loading}>Revelar cartas</Button>
	)
}

export default RevealCard
