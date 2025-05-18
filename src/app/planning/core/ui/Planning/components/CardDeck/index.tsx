import React, { useEffect, useState } from 'react'
import Item from './components/Item'
import { useSelector } from 'react-redux'
import { selectInfoPlanning, selectProfile, selectResult, selectShowCard, selectVotos } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { SYSTEM_CARD } from '@/app/planning/core/infrastructure/utils'
import { IGuest } from '@/app/plannings/core/domain/interfaces'

const CardDeck = () => {
	const guest: any = useSelector(selectProfile);
	const votos: any = useSelector(selectVotos);
	const showCard = useSelector(selectShowCard);
	const { systemCard }: any = useSelector(selectInfoPlanning);
	const [card, setCard] = useState<number | null | string>(null);
	const result = useSelector(selectResult);
	const { createVoto } = servicesPlanningLive.addVoto();

	useEffect(() => {
		if (card) {
			createVoto({
				variables: {
					data: {
						guestId: guest._id,
						value: `${card}`,
						planningId: guest.planningId
					}
				}
			})
		}
	}, [card])

	useEffect(() => {
		const voto = votos[guest._id];
		if (voto) {
			setCard(`${voto.value}`);
		}
	}, []);

	useEffect(() => {
		if (!result) setCard(null);
	}, [result]);


	return (
		<div className='w-full border-t-[0.3px] border-solid border-secondary-200 dark:border-default pt-5 mt-8'>
			<div className='flex items-center justify-center space-x-6'>
				{
					SYSTEM_CARD[systemCard].map((row: { label: string, value: number }, index: number) => <Item key={index} modeObserver={guest.modeObserver} showCard={showCard} onSelect={setCard} selected={card === row.label} name={row.label} />)
				}
			</div>
		</div>
	)
}

export default CardDeck
