import { selectControlCelebration, selectInfoPlanning, selectProfile } from '@/app/planning/core/infrastructure/redux'
import { Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User, useDisclosure } from '@nextui-org/react'
import React from 'react'

import Invite from './components/Invite'
import Modo from './components/Modo'
import Teams from './components/Teams'
import Guest from './components/Guest'
import { useAppSelector } from '@/infrastructure/hooks/store'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { VscFeedback } from "react-icons/vsc";
import Feedback from './components/Feedback'
import Reaction from './components/Recction'
import Dark from './components/Dark'
import { FaUsers } from 'react-icons/fa6'
import Control from './components/config/Control'
import isOnlyAdminPlanning from '@/infrastructure/hooks/isOnlyAdmin'
import Celebration from './components/config/Celebration'
import DonePlanning from './components/DonePlanning'
import { TYPE_PLANNING } from '@/app/plannings/core/domain/interfaces'
import DonePlanningManual from './components/DonePlanningManual'

const CardHeader = () => {
	// TODO: Crear interfaces
	const info: any = useAppSelector(selectInfoPlanning);
	const profile: any = useAppSelector(selectProfile);
	const { removeGuest } = servicesPlanningLive.removeGuestPlanning();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const isAdmin = isOnlyAdminPlanning();
	const isControlCelebration = useAppSelector(selectControlCelebration);

	const handleExit = () => {
		removeGuest({
			variables: {
				planningId: info.planningId,
				guestId: profile._id
			}
		})
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col'>
					<h1 className='text-3xl font-bold leading-7 mb-2'>{info.title}</h1>
					<p className='text-sm text-secondary-400 dark:text-white/60 dark:font-normal'>{info.description}</p>
				</div>
				<div className='flex flex-row items-center justify-center p-2 text-xs' >
					{isControlCelebration &&
						<>
							<Reaction />
							<Divider orientation="vertical" className='mx-2 h-8' />
						</>}
					<Invite />
					<Divider orientation="vertical" className='mx-2 h-8' />
					{/* <Teams />
					<Divider orientation="vertical" className='mx-2 h-8' /> */}
					<Guest />

					{isAdmin ?
						<>
							<Divider orientation="vertical" className='mx-2 h-8' />
							{info.typePlanning === TYPE_PLANNING.JIRA ? <DonePlanning /> : <DonePlanningManual />}
							<Divider orientation="vertical" className='mx-2 h-8' />
						</> :
						<Divider orientation="vertical" className='mx-2 h-8' />
					}

					<Dropdown className='dark:ring-2 dark:ring-default' backdrop='blur'>

						<DropdownTrigger>
							<Avatar
								size='sm'
								isBordered
								color='default'
								as="button"
								className="transition-transform"
								src={profile.avatar}
							/>
						</DropdownTrigger>
						<DropdownMenu
							disabledKeys={!isAdmin ? ["control", "emoticones", "profile"] : ["profile"]}
							variant="faded"
							aria-label="Dropdown menu with description">

							<DropdownSection aria-label="User" showDivider>
								<DropdownItem
									isReadOnly
									key="profile"
									className="h-14 gap-2 opacity-100"
								>
									<User
										name={profile.name}
										description={profile.email}
										classNames={{
											name: "text-default-600",
											description: "text-default-500",
										}}
										avatarProps={{
											size: "md",
											src: `${profile.avatar}`,
										}}
									/>
								</DropdownItem>
							</DropdownSection>
							<DropdownSection title="Acción" aria-label="Preferences" showDivider>
								<DropdownItem
									isReadOnly
									key="theme"
									className="cursor-default"
									endContent={
										<Modo />
									}
								>
									Modo observador
								</DropdownItem>
								<DropdownItem
									isReadOnly
									key="darkModo"
									className="cursor-default"
									endContent={
										<Dark />
									}
								>
									Modo oscuro
								</DropdownItem>
							</DropdownSection>


							<DropdownSection title="Configuración" aria-label="Ajuste" showDivider>
								<DropdownItem
									isReadOnly
									description="Todos pueden controlar y editar la sala"
									key="control"
									className="cursor-default"
									endContent={
										<Control />
									}
								>
									Compartir controles de la sala
								</DropdownItem>

								<DropdownItem
									isReadOnly
									description="Los jugadores pueden celebrar con emoticones"
									key="emoticones"
									className="cursor-default"
									endContent={
										<Celebration />
									}
								>
									Celebraciones con emoticonos
								</DropdownItem>
							</DropdownSection>


							<DropdownSection aria-label="Help & Feedback">
								<DropdownItem
									onClick={onOpen}
									key="feedback"
									startContent={<VscFeedback className='text-lg' />}
								>
									Feedback
								</DropdownItem>
								<DropdownItem
									onClick={handleExit}
									key="delete"
									className="text-danger"
									color="danger"
									startContent={<MdOutlinePowerSettingsNew className='text-lg' />}
								>
									Cerrar sesisión
								</DropdownItem>
							</DropdownSection>
						</DropdownMenu>
					</Dropdown>


				</div >
			</div >
			<Feedback isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	)
}

export default CardHeader
