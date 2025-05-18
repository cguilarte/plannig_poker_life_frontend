import { selectInfoPlanning } from '@/app/planning/core/infrastructure/redux'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import Image from 'next/legacy/image'
import React from 'react'
import { useSelector } from 'react-redux'

const ModalClosePlanning = ({ titlePlanning, isOpen, onOpenChange }: any) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop='blur' hideCloseButton={true}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalBody>
							<div className='flex flex-col items-center justify-center p-4'>

								<div className=' w-56 h-32 relative'>
									<Image src="/img/happy-girl-completed-her-work.svg" objectFit='cover' layout='fill' alt='Finish planning' />
								</div>

								<h2 className='font-bold text-lg mt-4'>Planning finalizada</h2>
								<p className='text-secondary-400 text-xs text-center'>La <strong>{titlePlanning}</strong> planning ah finalizado. <br /> Gracias por participar.</p>

							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal >
	)
}

export default ModalClosePlanning
