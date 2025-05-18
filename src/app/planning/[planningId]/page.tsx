"use client"

import React from 'react'
import { servicesPlanningLive } from '../core/infrastructure/services'
import { useParams } from 'next/navigation'
import LoadingInternal from '@/components/LoadingInternal'
import SessionInvitado from '../core/ui/SessionInvitado'
import Planning from '../core/ui/Planning'
import { useSelector } from 'react-redux'
import { resetVoto, selectGuest, selectInfoPlanning, selectProfile, selectResult, selectShowCard, selectTeamPoint, selectVotos, setControlCelebration, setControlPlanning, setGuests, setInfoPlanning, setProfile, setResult, setShowCard, setTaskCurrent, setTeamPoints, setVoto, setVotoNew } from '../core/infrastructure/redux'
import { useApolloClient, useSubscription } from '@apollo/client'
import { GET_PLANNING_DETAIL_LIVE, SUSCRIPTION_ACTIVATE_RESTORE_DATA, SUSCRIPTION_ADD_VOTO, SUSCRIPTION_CONTROL_CELEBRATION_PLANNING, SUSCRIPTION_CONTROL_PLANNING, SUSCRIPTION_DELETE_TASK, SUSCRIPTION_DESCONECTED_GUEST, SUSCRIPTION_DONE_PLANNING, SUSCRIPTION_LIST_GUEST, SUSCRIPTION_NEW_VOTO, SUSCRIPTION_REMOVE_GUEST, SUSCRIPTION_RESTORE_DATA, SUSCRIPTION_RESULT_PLANNING, SUSCRIPTION_SELECT_TASK, SUSCRIPTION_SHOW_CARD, SUSCRIPTION_UPATED_PERFIL_GUEST, SUSCRIPTION_UPDATE_PLANNING, SUSCRIPTION_UPDATE_TASK } from '../core/infrastructure/graphql'
import { useAppDispatch, useAppSelector } from '@/infrastructure/hooks/store'
import { IPlanning } from '@/app/plannings/core/domain/interfaces'
import WrapperProviders from '@/infrastructure/providers/WrapperProviders'
import useAlert from '@/infrastructure/hooks/useAlert'

export default function Page() {
	const { alertSuccess } = useAlert()
	const profile: any = useSelector(selectProfile);
	const param = useParams()
	const { loading, data } = servicesPlanningLive.detailPlanningId(param.planningId as string);
	const { restoreData } = servicesPlanningLive.sendRestoreData();
	const votos = useSelector(selectVotos);
	const result: any = useSelector(selectResult);
	const guests = useSelector(selectGuest);
	const showCard = useSelector(selectShowCard)
	const infoPlanning: IPlanning | any = useAppSelector(selectInfoPlanning)
	const { handleNewVoto } = servicesPlanningLive.newVoto();
	const teamPoints = useAppSelector(selectTeamPoint);

	const dispatch = useAppDispatch();
	const apolloClient = useApolloClient();

	useSubscription(SUSCRIPTION_LIST_GUEST, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { guests } = data.data.guestsPlanning;

				dispatch(setGuests(guests));

				// Update teamPoints 
				let teamsCurrent: any = teamPoints.length > 0 ? [...teamPoints] : [];

				guests.forEach((guest: any) => {

					if (teamsCurrent.length > 0) {
						const findTeam = teamsCurrent.find((item: any) => item.id === guest?.team?._id);
						if (!findTeam) {
							teamsCurrent.push({
								id: guest.team._id,
								name: guest.team.name,
								point: 0,
							});

						}
					} else {
						teamsCurrent.push({
							id: guest.team._id,
							name: guest.team.name,
							point: 0,
						});
					}
				});


				dispatch(setTeamPoints(teamsCurrent));

			}
		}
	})

	useSubscription(SUSCRIPTION_ADD_VOTO, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { guestId, value } = data.data.votoGuest;
				dispatch(setVoto({
					guestId,
					value
				}));
			}
		}
	});

	useSubscription(SUSCRIPTION_SHOW_CARD, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { value } = data.data.showCard;
				dispatch(setShowCard(value));
			}
		}
	})

	useSubscription(SUSCRIPTION_RESULT_PLANNING, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const result = data.data.resultPlanning;
				dispatch(setResult(result));
			}
		}
	})

	useSubscription(SUSCRIPTION_NEW_VOTO, {
		variables: { planningId: param.planningId },
		onData: () => {
			dispatch(setResult(null));
			dispatch(resetVoto());
		}
	})

	useSubscription(SUSCRIPTION_ACTIVATE_RESTORE_DATA, {
		variables: { planningId: param.planningId },
		onData: () => {
			let resultData = { ...result };
			if (result) {
				delete resultData?.__typename;
				if (resultData.estimatedValues) {
					resultData.estimatedValues = resultData.estimatedValues.map((row: any) => {
						return {
							key: row.key,
							value: row.value
						};
					})
				}
			}

			restoreData({
				variables: {
					data: {
						planningId: param.planningId,
						votos: JSON.stringify(votos),
						result: resultData,
						showCard
					}
				}
			})
		}
	})

	useSubscription(SUSCRIPTION_RESTORE_DATA, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { votos, result, showCard } = data.data.restoreData;
				if (result.average) {
					dispatch(setVotoNew(JSON.parse(votos)));
					dispatch(setResult(result));
					dispatch(setShowCard(showCard));
				}
			}
		}
	})

	useSubscription(SUSCRIPTION_DESCONECTED_GUEST, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const guest = data.data.desconectedGuest;
				//alertInfo(`${guest.name} se ha desconectado de la planning.`)
			}
		}
	});

	useSubscription(SUSCRIPTION_REMOVE_GUEST, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { guestId } = data.data.removeGuest;
				const guestsList = guests.filter((item: any) => item._id !== guestId);
				dispatch(setGuests(guestsList));

				if (profile && profile?._id === guestId) {
					dispatch(setProfile(null));
					window.location.href = `${window.location}`
				}
			}
		}
	});

	useSubscription(SUSCRIPTION_SELECT_TASK, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { taskId, subtaskId } = data.data.selectTask;
				let task = { ...infoPlanning.task.find((item: any) => item._id === taskId) };
				if (subtaskId) {
					task = task.subtasks.find((row: any) => row._id === subtaskId);
					task = { ...task, taskId: taskId }
				}

				if (task) {
					dispatch(setTaskCurrent(task));
				}
			}
		}
	});

	useSubscription(SUSCRIPTION_UPDATE_TASK, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { taskId, newVoto, votos } = data.data.updateTask;
				const cloneInfoPlanning = { ...infoPlanning }
				let listTeamPoints: any[] = [...teamPoints];

				if (votos && votos.length > 0) {
					votos.forEach((row: any) => {
						const findTeamIndex = listTeamPoints.findIndex((item: any) => item.id === row.teamId);
						if (findTeamIndex !== -1) {
							listTeamPoints[findTeamIndex] = { ...listTeamPoints[findTeamIndex], point: (listTeamPoints[findTeamIndex].point + row.voto) };
						}
					});

					dispatch(setTeamPoints(listTeamPoints))

				}

				if (newVoto) {
					const indexTask = cloneInfoPlanning.task.findIndex((item: any) => item._id === taskId);
					if (indexTask !== -1) {
						const task = cloneInfoPlanning.task[indexTask + 1];

						dispatch(setTaskCurrent(task));

						handleNewVoto({
							variables: {
								planningId: param.planningId
							}
						})
					}

				}

				apolloClient.refetchQueries({
					include: [GET_PLANNING_DETAIL_LIVE],
				});

				alertSuccess('Estimación guardada con éxito.')

			}
		}
	});

	useSubscription(SUSCRIPTION_UPATED_PERFIL_GUEST, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			console.log('guest update: ', data)

			if (data.data) {
				const { id, name, team, avatar } = data.data.updatePerfil;


				apolloClient.refetchQueries({
					include: [GET_PLANNING_DETAIL_LIVE],
				});

				const guestsList = guests.map((item: any) => {
					const cloneItem = { ...item };
					if (cloneItem._id.toString() === id.toString()) {
						cloneItem.name = name;
						cloneItem.avatar = avatar;
						cloneItem.team = team
					}
					return cloneItem;
				});

				if (profile._id.toString() === id.toString()) {
					dispatch(setProfile({
						...profile,
						name,
						avatar,
						team
					}))
				}

				dispatch(setGuests(guestsList));

				//dispatch(setInfoPlanning(updated));

			}
		}
	});

	useSubscription(SUSCRIPTION_DELETE_TASK, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { idTask } = data.data.deleteTaskSuscription;
				const cloneInfoPlanning = { ...infoPlanning }

				const task = cloneInfoPlanning.task.filter((item: any) => item._id.toString() !== idTask.toString());

				dispatch(setInfoPlanning({
					...cloneInfoPlanning,
					task
				}));

				apolloClient.refetchQueries({
					include: [GET_PLANNING_DETAIL_LIVE],
				});

			}
		}
	});

	useSubscription(SUSCRIPTION_CONTROL_PLANNING, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { control } = data.data.controlPlanning;
				dispatch(setControlPlanning(control));
			}
		}
	});

	useSubscription(SUSCRIPTION_CONTROL_CELEBRATION_PLANNING, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				const { control } = data.data.controlCelebration;
				dispatch(setControlCelebration(control));

			}
		}
	});

	useSubscription(SUSCRIPTION_UPDATE_PLANNING, {
		variables: { planningId: param.planningId },
		onData: ({ data }: any) => {
			if (data.data) {
				if (data.data.updatePlanning) {
					apolloClient.refetchQueries({
						include: [GET_PLANNING_DETAIL_LIVE],
					});
				}
			}
		}
	});


	dispatch(setInfoPlanning(data));

	if (loading) return <LoadingInternal />
	if (!profile || profile.planningId !== param.planningId) return <SessionInvitado protectPlanning={data.protectPlanning} titlePlanning={data.title} descriptionPlanning={data.description} planningId={param.planningId as string} teams={data.teams} />


	return (
		<WrapperProviders>
			<Planning />
		</WrapperProviders>
	)
}

