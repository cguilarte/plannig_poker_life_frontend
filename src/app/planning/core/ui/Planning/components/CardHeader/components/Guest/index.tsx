import { selectGuest, selectInfoPlanning, selectPlanningId, selectProfile } from '@/app/planning/core/infrastructure/redux';
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services';
import isAdminPlanning from '@/infrastructure/hooks/IsAdminPlanning';
import { useAppSelector } from '@/infrastructure/hooks/store';
import { Button, Chip, Divider, Popover, PopoverContent, PopoverTrigger, Tooltip, User } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { RiUserStarLine } from 'react-icons/ri';

const Guest = () => {
	const guests = useAppSelector(selectGuest);
	const planningId: any = useAppSelector(selectPlanningId);
	const currentProfile: any = useAppSelector(selectProfile);
	const planningLive: any = useAppSelector(selectInfoPlanning);
	const { removeGuest } = servicesPlanningLive.removeGuestPlanning();
	const [userPermisseDelete, setUserPermisseDelete] = useState(false);
	const isControl = isAdminPlanning();
	const handleRemove = (guestId: string) => {
		removeGuest({
			variables: {
				planningId,
				guestId
			}
		})
	}

	useEffect(() => {
		if (planningLive.user.email === currentProfile.email) setUserPermisseDelete(true);
	}, [])

	return (
		<>
			<Popover placement="bottom" backdrop='blur' offset={20} showArrow>
				<PopoverTrigger>
					<Button size="sm" color='primary' className='bg-white flex flex-row items-center dark:bg-default dark:text-white' startContent={< RiUserStarLine className="text-lg dark:text-white" />
					} variant='flat'>
						<strong className='tracking-widest text-sm'>{guests.length}</strong>
						<span className='underline cursor-pointer text-sm' >Invitado(s)</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className=" flex flex-col px-1 py-2">
						<h2 className='font-bold text-sm'>Invitados</h2>
						<p className='text-xs text-secondary-400 dark:text-white/80'>Usuarios de la planning.</p>

						<Divider orientation='horizontal' className='my-2' />

						<div className='flex flex-col justify-start space-y-4  mb-4 min-w-[380px] mt-4'>
							{guests.length > 0 && guests.map((item: any, index: number) => {

								return (
									<div key={index} className='flex items-center justify-start space-x-4'>
										<div className='w-[200px]'>
											<div className='relative w-8 h-12'>
												<span className={`w-3 h-3 ring-2 ring-white rounded-full ${item.active ? 'bg-green-600' : 'bg-secondary-200'} absolute bottom-1.5 right-0 z-50`}></span>
												<User
													classNames={{
														wrapper: 'w-full'
													}}
													name={item.name}
													description={item.email}
													avatarProps={{
														size: 'md',
														src: item.avatar
													}}
												/>
											</div>
										</div>
										<div className='w-[100px] mr-2'>
											<Chip classNames={{ content: 'text-xs' }} variant='bordered' size="sm">{item?.team?.name}</Chip>
										</div>
										{(isControl && currentProfile.email !== item.email) &&
											<div>
												<Tooltip content="Expulsar">
													<Button onClick={() => handleRemove(item._id)} size="sm" radius='full' variant='ghost' isIconOnly color='danger'>
														<AiOutlineClose />
													</Button>
												</Tooltip>
											</div>
										}
									</div>
								)
							})}
						</div>

					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default Guest
