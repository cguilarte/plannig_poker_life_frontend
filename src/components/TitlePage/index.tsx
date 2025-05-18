import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsArrowLeftCircle } from 'react-icons/bs';

interface ITitleProps {
	title: string;
	heading?: string;
	description?: string;
	onBack?: string | null
}

const TitlePage = ({ title = '', heading = '', description = '', onBack = null }: ITitleProps) => {
	const router = useRouter();
	return (
		<div className='flex flex-col'>
			<div className='flex items-center'>
				{onBack && <Button size='sm' className='mr-2' onClick={() => router.push(onBack)} color='default' isIconOnly radius='full' variant="light">
					<BsArrowLeftCircle className="text-2xl text-secondary-400" />
				</Button>}
				<h1 className='text-black font-bold text-2xl'>{title} {heading.length > 0 ? '-' : ''} <span className='text-black/50'>{heading}</span></h1>
			</div>
			<p className='text-black/75 font-light text-sm'>{description}</p>
		</div>
	)
}

export default TitlePage
