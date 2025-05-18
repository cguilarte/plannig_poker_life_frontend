/* eslint-disable @next/next/no-img-element */
import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from '@nextui-org/react'
import React from 'react'
import { IIssues } from '../../../domain/interfaces'
import dynamic from 'next/dynamic';
import { IntlProvider } from 'react-intl'

interface IProps {
	isOpen: boolean;
	onOpenChange: any;
	item: IIssues
}
const EditorJira = dynamic(() => import('@/components/EditorJira'), {
	ssr: false,
})

const Details = ({ isOpen, onOpenChange, item }: IProps) => {
	const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

	return (
		<Modal
			size="3xl"
			backdrop="opaque"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			scrollBehavior={scrollBehavior}>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col">
							<h2 className='font-bold m-0'>{`${item.key} ${item.title}`}</h2>
							<div className='flex items-center text-sm text-secondary-300'>Proyecto <span className='mx-2'>/</span> <img className='mr-1' src={item.project.avatarUrls} width={12} height={12} alt='logo' /> {item.project.name}  <span className='mx-2'>/</span> {item.key}</div>
						</ModalHeader>
						<ModalBody className='pb-10'>
							<div className='text-sm'>
								<IntlProvider locale="es" defaultLocale="es">
									<EditorJira viewOnly={true} body={item.description} />
								</IntlProvider>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default Details
