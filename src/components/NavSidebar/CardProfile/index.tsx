import { resetUser, selectUser } from '@/app/login/core/infrastructure/redux'
import { selectProfile } from '@/app/planning/core/infrastructure/redux'
import FormProfile from '@/components/Profile/FormProfile'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User, useDisclosure } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { GiSettingsKnobs } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const CardProfile = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { data: session, status } = useSession();

	const profile: any = useSelector(selectUser);

	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(resetUser());
		signOut({
			redirect: true
		});
	}

	return (
		<>
			<div className=' relative bottom-2'>

				<Dropdown placement="top-start">
					<DropdownTrigger>
						<User
							as="button"
							avatarProps={{
								size: 'sm',
								isBordered: true,
								src: `${profile?.avatar}`,
							}}
							className="transition-transform text-white"
							description={profile?.email}
							name={profile?.name}
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="User Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<User
								description={profile?.email}
								name={profile?.name}
								avatarProps={{
									isBordered: false,
									src: `${profile?.avatar}`,
								}}
							/>
						</DropdownItem>
						<DropdownItem onClick={onOpen} key="settings" startContent={<CgProfile />}>
							Mi perfil
						</DropdownItem>
						<DropdownItem key="configurations" startContent={<GiSettingsKnobs />}>Configuración</DropdownItem>
						<DropdownItem key="help_and_feedback" startContent={<BiHelpCircle />}>
							Ayuda & Feedback
						</DropdownItem>
						<DropdownItem onClick={() => logOut()} key="logout" color="danger" startContent={<FiLogOut />}>
							Cerrar sessión
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>

			</div>
			{isOpen && <FormProfile isOpen={isOpen} onOpenChange={onOpenChange} />}
		</>
	)
}

export default CardProfile
