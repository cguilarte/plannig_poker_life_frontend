"use client"

import React, { useEffect } from 'react';
import { CardDeck, CardHeader, CardInforme, CardTable, CardTaskJira, CardTaskManual } from './components';
import { useSelector } from 'react-redux';
import { selectGuest, selectInfoPlanning, selectPlanningId, selectTaskCurrent } from '../../infrastructure/redux';
import { servicesPlanningLive } from '../../infrastructure/services';
import { IGuest, IPlanning, TYPE_PLANNING } from '@/app/plannings/core/domain/interfaces';
import CardTaskCurrent from './components/CardTaskCurrent';
import { useAppSelector } from '@/infrastructure/hooks/store';
import FlyingEmojisOverlay from './components/FlyingEmojisOverlay';
import ModalClosePlanning from './components/ModalClosePlanning';
import { useDisclosure } from '@nextui-org/react';
import { useSubscription } from '@apollo/client';
import { SUSCRIPTION_DONE_PLANNING } from '../../infrastructure/graphql';


const Planning = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const planningId: string | null = useAppSelector(selectPlanningId);
	const planning: IPlanning | any = useAppSelector(selectInfoPlanning);
	const taskCurrent = useAppSelector(selectTaskCurrent)
	servicesPlanningLive.guestsPlanning(planningId);

	useSubscription(SUSCRIPTION_DONE_PLANNING, {
		variables: { planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { status } = data.data.donePLanning;
				if (status) {
					onOpen();
				}
			}
		}
	});



	useEffect(() => {
		if (planning) {
			if (planning.status === "DONE") onOpen();
		}
	}, [planning, onOpen]);

	return (
		<>
			<div className='grid grid-cols-12 gap-2 h-full justify-between dark:bg-gradient-dark'>
				<span className="fixed inset-0 dark:bg-[url('/img/background.png')] bg-no-repeat"></span>
				<div className='col-span-9 relative p-4'>
					<div className='flex flex-col justify-between h-[100%]'>

						<CardHeader />
						<CardTable />
						<CardTaskCurrent taskCurrent={taskCurrent} />

						<CardDeck />

					</div>
				</div>

				<div className='col-span-3 h-[100vh] bg-white dark:bg-[#304156] shadow-md'>
					<div className='flex flex-col gap-0 py-2 relative h-full'>

						{planning.typePlanning === TYPE_PLANNING.JIRA && <CardTaskJira />}
						{planning.typePlanning === TYPE_PLANNING.MANUAL && <CardTaskManual />}

						{planning.task.length > 0 && <CardInforme />}

					</div>
				</div>
			</div>
			<FlyingEmojisOverlay />
			{isOpen && <ModalClosePlanning titlePlanning={planning.title} isOpen={isOpen} />}
		</>
	)
}

export default Planning
