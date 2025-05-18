import { Button, Divider, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import ModalTypePlanning from './ModalTypePlanning'
import { STATUS_PLANNING, TYPE_PLANNING } from '../domain/interfaces'
import { HiOutlineSelector } from 'react-icons/hi'
import { STATUS_PLANNING_LANG, TypePlanning } from '../domain/planningData'
import { useRouter } from 'next/navigation'
import { TfiControlShuffle } from 'react-icons/tfi'
import { LiaJira } from 'react-icons/lia'
import { ROUTER } from '@/infrastructure/constants'

const Filter = ({ onfilters, filters }: any) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isOpenCreate, setIsOpenCreate] = React.useState(false);
	const router = useRouter();

	const [search, setSearch] = React.useState<string>('');
	const [selectStatus, setSelectStatus] = useState(new Set(["ALL"]))
	const [selectTypePlanning, setSelectTypePlanning] = useState(new Set(["ALL"]))

	const handleSearch = (value: string) => {
		onfilters({ ...filters, search: value });
	}

	const handleSelectStatus = (e: any): void => {
		const status: string = e.target.value;
		onfilters({ ...filters, status });
	}

	const handleSelectTypePlanning = (e: any): void => {
		onfilters({ ...filters, typePlanning: e.target.value });
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
						<SelectItem key={STATUS_PLANNING.PENDING}>{STATUS_PLANNING_LANG[STATUS_PLANNING.PENDING]}</SelectItem>
						<SelectItem key={STATUS_PLANNING.DONE}>{STATUS_PLANNING_LANG[STATUS_PLANNING.DONE]}</SelectItem>
					</Select>

					<Select
						label="Tipo de planning"
						className="w-44"
						selectionMode="single"
						defaultSelectedKeys={selectTypePlanning}
						onChange={handleSelectTypePlanning}
						selectorIcon={<HiOutlineSelector />}
					>
						<SelectItem key="ALL" value="ALL">Todos</SelectItem>
						<SelectItem key={TYPE_PLANNING.MANUAL}>{TYPE_PLANNING.MANUAL}</SelectItem>
						<SelectItem key={TYPE_PLANNING.JIRA}>{TYPE_PLANNING.JIRA}</SelectItem>
					</Select>

				</div>
				<div className='flex items-center justify-end col-span-4'>
					<Popover
						key="opaque"
						offset={10}
						placement="left-start"
						backdrop="opaque"
						isOpen={isOpenCreate}
						onOpenChange={(open) => setIsOpenCreate(open)}
					>
						<PopoverTrigger>
							<Button variant='solid' startContent={<FiPlus />} color='primary' size='md'>Crear planning</Button>
						</PopoverTrigger>
						<PopoverContent className="w-72 flex flex-col p-4">
							<h3 className='text-base  font-bold'>Seleccione el tipo de planning</h3>
							<Divider className='my-4' />
							<div className="grid grid-cols-1 gap-4 items-center">
								<div
									className={`rounded-lg shadow-md relative bg-primary-100 flex flex-col p-4 cursor-pointer border-solid border-2 border-transparent hover:border-slate-500 transition-all`}
									onClick={() => {
										router.push(`${ROUTER.plannings.form}?type=manual`)
									}}
								>
									<strong className="text-sm font-bold text-secondary uppercase flex items-center mb-1"><TfiControlShuffle className=" text-lg mr-2" />{TypePlanning.MANUAL}</strong>
									<p className=" text-xs text-secondary-400">Crea tus propios tickets sin integrar plataformas externas</p>
								</div>
								<div
									className={`rounded-lg shadow-md relative bg-primary-100 flex flex-col p-4 cursor-pointer  border-solid border-2 border-transparent hover:border-slate-500 transition-all`}
									onClick={() => {
										window.location.href = `${process.env.NEXT_PUBLIC_JIRA_URL_INTEGRATION}`;
									}}
								>
									<strong className="text-sm font-bold text-secondary uppercase flex items-center mb-1"><LiaJira className=" text-lg mr-2" /> {TypePlanning.JIRA}</strong>
									<p className=" text-xs text-secondary-400">Conecta tu proyecto Atlassian Jira e importa tareas en unos pocos clics.</p>
								</div>
							</div>
						</PopoverContent>
					</Popover>

				</div>
			</div>
			<ModalTypePlanning isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	)
}

export default Filter
