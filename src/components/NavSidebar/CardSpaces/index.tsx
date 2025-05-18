import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { ChevronDownIcon } from './ChevronDownIcon';

const CardSpace = () => {

	console.log('spaces')

	return (
		<li className='mb-8'>
			<div className='max-w-xs bg-[#3f434e] flex flex-col p-2.5 rounded-lg cursor-pointer'>
				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<div className='flex flex-row items-center justify-between'>
							<div className='flex flex-col'>
								<p className=' text-sm text-white font-medium pb-0'>Espacio de trabajo</p>
								<span className=' text-xs text-white/70 font-light'>Ambiente de Desarrollo</span>
							</div>
							<ChevronDownIcon />
						</div>

					</DropdownTrigger>
					<DropdownMenu variant="faded" aria-label="Dropdown menu with description">
						<DropdownSection title="Mis Espacios" showDivider>
							<DropdownItem
								key="new"
								description="Create a new file"
							>
								Ambiente de Desarrollo
							</DropdownItem>

							<DropdownItem
								key="edit"
								description="Allows you to edit the file"
							>
								Team de QA
							</DropdownItem>
						</DropdownSection>
						<DropdownSection title="">
							<DropdownItem
								key="delete"
								className="text-primary"
								startContent={<FiPlusCircle />}
							>
								Nuevo
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</div>
		</li>
	)
}

export default CardSpace
