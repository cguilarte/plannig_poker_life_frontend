/* eslint-disable react-hooks/rules-of-hooks */
import { ADD_VOTO, CREATE_FEEDBACK, CREATE_GUEST_TEMPORAL, DELETE_TASK, DONE_PLANNING, GET_FIELDS_RESOURCES, GET_GUEST_PLANNING, GET_PLANNING_DETAIL_LIVE, LANZAR_EMOJI, NEW_VOTO, PLANING_RESULT, REMOVE_GUEST_PLANNING, SELECT_TASK, SEND_CONTROL_CELEBRATION_PLANNING, SEND_CONTROL_PLANNING, SEND_EMOJI, SEND_RESTORE_DATA, SHOW_CARD, UPDATE_GUEST_TEMPORAL, UPDATE_PERFIL_GUEST, UPDATE_TASK, VALIDATE_PASSWORD_PLANNING } from "./graphql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

export class servicesPlanningLive {

	static detailPlanningId(planningId: string) {
		const { data, loading } = useQuery(GET_PLANNING_DETAIL_LIVE, {
			fetchPolicy: 'no-cache',
			variables: {
				planningId
			}
		});


		return { data: data?.getPlanning, loading };
	}

	static guestsPlanning(planningId: string | null) {
		useQuery(GET_GUEST_PLANNING, {
			fetchPolicy: 'no-cache',
			variables: {
				planningId
			}
		});
	}

	static createGuestTemporal(onSuccess: (data: any) => void) {
		const [createGuestTemporal, { data, loading, error }] = useMutation(CREATE_GUEST_TEMPORAL, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { createGuestTemporal, data, loading, error }
	}

	static updateGuestTemporal(onSuccess: (data: any) => void) {
		const [updateTemporal, { data, loading, error }] = useMutation(UPDATE_GUEST_TEMPORAL, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { updateTemporal, data, loading, error }
	}

	static resultPlanning() {
		const [sendDataResult, { loading }] = useMutation(PLANING_RESULT);

		return { sendDataResult, loading }
	}

	static addVoto() {
		const [createVoto] = useMutation(ADD_VOTO);
		return { createVoto }
	}

	static showCard() {
		const [handleShowCard] = useMutation(SHOW_CARD);
		return { handleShowCard }
	}


	static newVoto() {
		const [handleNewVoto] = useMutation(NEW_VOTO);
		return { handleNewVoto }
	}


	static sendRestoreData() {
		const [restoreData] = useMutation(SEND_RESTORE_DATA);
		return { restoreData }
	}

	static removeGuestPlanning() {
		const [removeGuest] = useMutation(REMOVE_GUEST_PLANNING);
		return { removeGuest }
	}

	static selectTask() {
		const [selectTask] = useMutation(SELECT_TASK);
		return { selectTask }
	}

	static updateTask() {
		const [updateTask, { data, loading, error }] = useMutation(UPDATE_TASK);

		return { updateTask, data, loading, error }
	}

	static updatePerfilGuest(onSuccess: (data: any) => void) {
		const [updatePerfilGuest, { data, loading, error }] = useMutation(UPDATE_PERFIL_GUEST, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { updatePerfilGuest, data, loading, error }
	}

	static deleteTask() {
		const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK);
		return { deleteTask, data, loading, error }
	}

	static feedback(onSuccess: (data: any) => void) {
		const [createFeedback, { data, loading, error }] = useMutation(CREATE_FEEDBACK, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});
		return { createFeedback, data, loading, error }
	}

	static emoji() {
		const [sendEmoji] = useMutation(SEND_EMOJI);
		return { sendEmoji }
	}

	static lanzarEmoji() {
		const [lanzarEmoji] = useMutation(LANZAR_EMOJI);
		return { lanzarEmoji }
	}

	static controlPlanning() {
		const [sendControlPlanning] = useMutation(SEND_CONTROL_PLANNING);
		return { sendControlPlanning }
	}

	static controlCelebration() {
		const [sendControlCelebration] = useMutation(SEND_CONTROL_CELEBRATION_PLANNING);
		return { sendControlCelebration }
	}


	static getResourcesJira(planningId: string) {
		const { data, loading } = useQuery(GET_FIELDS_RESOURCES, {
			fetchPolicy: 'no-cache',
			variables: {
				planningId
			}
		});
		let result = [];

		if (data?.getFieldsJira.length > 0) {
			result = data.getFieldsJira
		}

		return { result, loading };
	}

	static donePlanning(onSuccess: (data: any) => void) {
		const [modalDone, { data, loading, error }] = useMutation(DONE_PLANNING, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { modalDone, data, loading, error }
	}


	static validatePasswordPlanning(onSuccess: (data: any) => void) {
		const [modalValidatePassword, { data, loading, error }] = useMutation(VALIDATE_PASSWORD_PLANNING, {
			onCompleted: (data) => {
				onSuccess(data)
			}
		});

		return { modalValidatePassword, data, loading, error }
	}

}