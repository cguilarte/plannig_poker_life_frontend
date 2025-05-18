import { Button, Input, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import ModalCreate from './ModalCreate'
import { HiOutlineSelector } from 'react-icons/hi'

const Filter = ({ onfilters, filters }: any) => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [search, setSearch] = React.useState<string>('');
	const [selectStatus, setSelectStatus] = useState(new Set(["ALL"]))

	const handleSearch = (value: string) => {
		onfilters({ ...filters, search: value });
	}

	const handleSelectStatus = (e: any): void => {
		const status: string = e.target.value;
		onfilters({ ...filters, status });
	}


	return (
		<>
			<div className='grid grid-cols-12 mt-10'>
				<div className='flex gap-4 items-center col-span-8'>
					<Input
						isClearable
						type="text"
						variant="bordered"
						defaultValue={search}
						onValueChange={(value: string) => handleSearch(value)}
						className="w-60"
						label="Buscar"
						startContent={
							<BiSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
						}
					/>

					<Select
						label="Status"
						className="w-44"
						selectionMode="single"
						defaultSelectedKeys={selectStatus}
						onChange={handleSelectStatus}
						selectorIcon={<HiOutlineSelector />}
					>
						<SelectItem key="ALL" value="ALL">Todos</SelectItem>
						<SelectItem key='true' value="true">Activo</SelectItem>
						<SelectItem key='false' value="false">Inactivo</SelectItem>
					</Select>
				</div>
				<div className='flex items-center justify-end col-span-4'>
					<Button variant='solid' startContent={<FiPlus />} color='primary' size='md' onClick={onOpen}>Crear team</Button>
				</div>
			</div>
			<ModalCreate isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	)
}

export default Filter
