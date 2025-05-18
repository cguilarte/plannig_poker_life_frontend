/* eslint-disable react-hooks/rules-of-hooks */
import { selectInfoPlanning, selectProfile } from "@/app/planning/core/infrastructure/redux"
import { useAppSelector } from "./store"

const isOnlyAdminPlanning = () => {
	const profile: any = useAppSelector(selectProfile);
	const planning: any = useAppSelector(selectInfoPlanning);
	return profile.email === planning.user.email;

}

export default isOnlyAdminPlanning;