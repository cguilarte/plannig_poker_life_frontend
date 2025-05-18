import { selectUser } from '@/app/login/core/infrastructure/redux'
import { TYPE_USER } from '@/app/users/core/domain/userData'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { CiCircleList } from 'react-icons/ci'
import { FiUsers } from 'react-icons/fi'
import { RiTeamLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const LIST_MENU = [
	{
		label: 'Plannings',
		link: '/plannings',
		icon: <CiCircleList />,
		onlyAdmin: false,
	},
	{
		label: 'Users',
		link: '/users',
		icon: <FiUsers />,
		onlyAdmin: true,

	}, {
		label: 'Teams',
		link: '/teams',
		icon: <RiTeamLine />,
		onlyAdmin: false,
	}
]

const Menu = () => {
	const pathRouter = usePathname();
	const router = useRouter()
	const user = useSelector(selectUser);
	const MENU = user.rol === TYPE_USER.COORDINATOR ? LIST_MENU.filter((item) => item.onlyAdmin === false) : LIST_MENU;

	const menu = MENU.map((item, index) => {
		return (
			<li className='mb-4' key={index}>
				<Link href={item.link}>
					<Button
						type='button'
						onClick={() => router.push(item.link, { scroll: true })}
						startContent={item.icon}
						variant='light'
						radius='full'
						className={`text-base ${pathRouter === item.link ? 'bg-primary-700 font-medium text-primary' : 'text-white hover:bg-default/40'}`}
						disabled={pathRouter === item.link ? true : false}
						data-hover={null}
						size="md">
						{item.label}
					</Button>
				</Link>
			</li>
		)
	})

	return (
		<>
			{menu}
		</>

	)
}

export default Menu
