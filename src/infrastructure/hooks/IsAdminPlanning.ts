/* eslint-disable react-hooks/rules-of-hooks */
import { selectControlPlanning, selectInfoPlanning, selectProfile } from "@/app/planning/core/infrastructure/redux"
import { useAppSelector } from "./store"

const isAdminPlanning = () => {
	const profile: any = useAppSelector(selectProfile);
	const planning: any = useAppSelector(selectInfoPlanning);
	const control: boolean = useAppSelector(selectControlPlanning);

	if (control) return true;

	return profile.email === planning.user.email;

}

export default isAdminPlanning;