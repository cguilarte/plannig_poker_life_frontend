import React from 'react'
import User from './components/User'
import Result from './components/Result'
import { useSelector } from 'react-redux'
import { selectGuest, selectResult, selectShowCard, selectVotos } from '@/app/planning/core/infrastructure/redux'
import { Button } from '@nextui-org/react'
import RevealCard from './components/RevealCard'

const CardTable = () => {

	const guests: any = useSelector(selectGuest);
	const votos: any = useSelector(selectVotos);
	const showCard = useSelector(selectShowCard);
	const result = useSelector(selectResult);


	return (
		<div className='flex flex-col justify-center items-center space-y-0 relative px-0 w-[75%] mx-auto'>
			<div className='flex items-center space-x-16'>
				<User modeObserver={guests[0]?.modeObserver} showCard={showCard} value={votos[guests[0]?._id]?.value} isVoto={votos[guests[0]?._id]} padding='pt-20' active={guests[0] ? guests[0].active : false} image={guests[0] ? guests[0].avatar : ''} name={guests[0] ? guests[0].name : ''} email={guests[0] ? guests[0].email : ''} />
				<User modeObserver={guests[1]?.modeObserver} showCard={showCard} value={votos[guests[1]?._id]?.value} isVoto={votos[guests[1]?._id]} active={guests[1] ? guests[1].active : false} image={guests[1] ? guests[1].avatar : ''} name={guests[1] ? guests[1].name : ''} email={guests[1] ? guests[1].email : ''} />
				<User modeObserver={guests[2]?.modeObserver} showCard={showCard} value={votos[guests[2]?._id]?.value} isVoto={votos[guests[2]?._id]} active={guests[2] ? guests[2].active : false} image={guests[2] ? guests[2].avatar : ''} name={guests[2] ? guests[2].name : ''} email={guests[2] ? guests[2].email : ''} />
				<User modeObserver={guests[3]?.modeObserver} showCard={showCard} value={votos[guests[3]?._id]?.value} isVoto={votos[guests[3]?._id]} active={guests[3] ? guests[3].active : false} image={guests[3] ? guests[3].avatar : ''} name={guests[3] ? guests[3].name : ''} email={guests[3] ? guests[3].email : ''} />
				<User modeObserver={guests[4]?.modeObserver} showCard={showCard} value={votos[guests[4]?._id]?.value} isVoto={votos[guests[4]?._id]} active={guests[4] ? guests[4].active : false} image={guests[4] ? guests[4].avatar : ''} name={guests[4] ? guests[4].name : ''} email={guests[4] ? guests[4].email : ''} />
				<User modeObserver={guests[5]?.modeObserver} showCard={showCard} value={votos[guests[5]?._id]?.value} isVoto={votos[guests[5]?._id]} active={guests[5] ? guests[5].active : false} image={guests[5] ? guests[5].avatar : ''} name={guests[5] ? guests[5].name : ''} email={guests[5] ? guests[5].email : ''} />
				<User modeObserver={guests[6]?.modeObserver} showCard={showCard} value={votos[guests[6]?._id]?.value} isVoto={votos[guests[6]?._id]} padding='pt-20' active={guests[6] ? guests[6].active : false} image={guests[6] ? guests[6].avatar : ''} name={guests[6] ? guests[6].name : ''} email={guests[6] ? guests[6].email : ''} />
			</div>

			<div className='flex items-center w-full justify-between'>
				<User modeObserver={guests[7]?.modeObserver} showCard={showCard} value={votos[guests[7]?._id]?.value} isVoto={votos[guests[7]?._id]} active={guests[7] ? guests[7].active : false} image={guests[7] ? guests[7].avatar : ''} name={guests[7] ? guests[7].name : ''} email={guests[7] ? guests[7].email : ''} />

				<div className='w-[580px] dark:ring-1 dark:ring-transparent flex flex-col items-center justify-center border-white dark:border-default border-2 h-52 rounded-full bg-primary/10 dark:bg-default  p-10'>
					{result ? <Result /> : <RevealCard />}
				</div>

				<User modeObserver={guests[8]?.modeObserver} showCard={showCard} value={votos[guests[8]?._id]?.value} isVoto={votos[guests[8]?._id]} active={guests[8] ? guests[8].active : false} image={guests[8] ? guests[8].avatar : ''} name={guests[8] ? guests[8].name : ''} email={guests[8] ? guests[8].email : ''} />
			</div>

			<div className='flex items-center space-x-16'>
				<User modeObserver={guests[9]?.modeObserver} showCard={showCard} value={votos[guests[9]?._id]?.value} isVoto={votos[guests[9]?._id]} padding='pb-20' active={guests[9] ? guests[9].active : false} image={guests[9] ? guests[9].avatar : ''} name={guests[9] ? guests[9].name : ''} email={guests[9] ? guests[9].email : ''} />
				<User modeObserver={guests[10]?.modeObserver} showCard={showCard} value={votos[guests[10]?._id]?.value} isVoto={votos[guests[10]?._id]} active={guests[10] ? guests[10].active : false} image={guests[10] ? guests[10].avatar : ''} name={guests[10] ? guests[10].name : ''} email={guests[10] ? guests[10].email : ''} />
				<User modeObserver={guests[11]?.modeObserver} showCard={showCard} value={votos[guests[11]?._id]?.value} isVoto={votos[guests[11]?._id]} active={guests[11] ? guests[11].active : false} image={guests[11] ? guests[11].avatar : ''} name={guests[11] ? guests[11].name : ''} email={guests[11] ? guests[11].email : ''} />
				<User modeObserver={guests[12]?.modeObserver} showCard={showCard} value={votos[guests[12]?._id]?.value} isVoto={votos[guests[12]?._id]} active={guests[12] ? guests[12].active : false} image={guests[12] ? guests[12].avatar : ''} name={guests[12] ? guests[12].name : ''} email={guests[12] ? guests[12].email : ''} />
				<User modeObserver={guests[13]?.modeObserver} showCard={showCard} value={votos[guests[13]?._id]?.value} isVoto={votos[guests[13]?._id]} active={guests[13] ? guests[13].active : false} image={guests[13] ? guests[13].avatar : ''} name={guests[13] ? guests[13].name : ''} email={guests[13] ? guests[13].email : ''} />
				<User modeObserver={guests[14]?.modeObserver} showCard={showCard} value={votos[guests[14]?._id]?.value} isVoto={votos[guests[14]?._id]} active={guests[14] ? guests[14].active : false} image={guests[14] ? guests[14].avatar : ''} name={guests[14] ? guests[14].name : ''} email={guests[14] ? guests[14].email : ''} />
				<User modeObserver={guests[15]?.modeObserver} showCard={showCard} value={votos[guests[15]?._id]?.value} isVoto={votos[guests[15]?._id]} padding='pb-20' active={guests[15] ? guests[15].active : false} image={guests[15] ? guests[15].avatar : ''} name={guests[15] ? guests[15].name : ''} email={guests[15] ? guests[15].email : ''} />
			</div>

		</div>
	)
}

export default CardTable
