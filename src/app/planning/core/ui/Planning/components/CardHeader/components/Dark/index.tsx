import { selectInfoPlanning, selectProfile, setProfile } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import { useAppDispatch, useAppSelector } from '@/infrastructure/hooks/store';
import { Button, Switch, Tooltip } from '@nextui-org/react'
import { useTheme } from 'next-themes';
import React from 'react'
import { CiDark, CiLight } from 'react-icons/ci';

const Dark = () => {
	const { theme, setTheme } = useTheme()

	return (
		<>
			<Switch
				onValueChange={(value: boolean) => setTheme(value ? 'dark' : 'light')}
				defaultSelected={theme === 'dark'}
				size="sm"
				color='primary'
				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<CiLight className={className} />

					) : (
						<CiDark className={className} />
					)}
			>
				<Tooltip key='bottom' color='secondary' placement='bottom' content={`Modo ${theme}`}></Tooltip>
			</Switch>
		</>
	)
}

export default Dark
