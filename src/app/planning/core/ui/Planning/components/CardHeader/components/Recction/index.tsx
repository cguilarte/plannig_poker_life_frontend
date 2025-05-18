import { selectPlanningId, selectProfile } from '@/app/planning/core/infrastructure/redux'
import { servicesPlanningLive } from '@/app/planning/core/infrastructure/services'
import { EMOJI_MAP } from '@/app/planning/core/infrastructure/utils'
import { useAppSelector } from '@/infrastructure/hooks/store'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { MdEmojiEmotions, MdOutlineEmojiEmotions } from 'react-icons/md'

const Reaction = () => {
	const { sendEmoji } = servicesPlanningLive.emoji();
	const planningId = useAppSelector(selectPlanningId);
	const [isOpen, setIsOpen] = React.useState(false);
	const profile: any = useAppSelector(selectProfile)

	const handleSendEmoji = (emoji: string) => {
		sendEmoji({
			variables: {
				name: profile.name,
				emoji,
				planningId
			}
		});
		setIsOpen(!isOpen)
	}

	return (
		<>
			<Popover placement="bottom" backdrop='transparent' offset={10} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
				<PopoverTrigger>
					<Button size="sm" color='primary' className='text-sm dark:hover:bg-default' variant='light' isIconOnly radius='full' startContent={<Image src="/img/emoji/good.svg" width={30} height={30} alt='Emoji' />} />
				</PopoverTrigger>
				<PopoverContent className='dark:bg-[#3C4043]'>
					<div className='w-auto flex items-center justify-center'>
						{EMOJI_MAP.map((row: string, index: number) => <button onClick={() => handleSendEmoji(row)} key={index} className='w-10 h-10 transition-all rounded-full text-2xl hover:bg-primary-200 dark:hover:bg-black/50'>{row}</button>)}
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default Reaction
