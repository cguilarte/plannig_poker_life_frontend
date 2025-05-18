/* eslint-disable @next/next/no-img-element */
import { Button, Chip, Link, Tooltip, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { IIssues } from '../../../domain/interfaces'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import Details from './Details'
import { CiBoxList } from 'react-icons/ci'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

interface Iprops {
	item: IIssues,
	index: number
}

const ItemSubtask = ({ item, index }: Iprops) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	console.log('index subtasl: ', index)

	return (
		<>
			<div className={`grid grid-cols-12 items-center justify-between w-full rounded-lg p-2 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F7F8F9]'}`}>
				<div className='flex items-center col-span-8'>
					<img width={20} height={20} alt='logo' className=' rounded-full' src={item.issuetype.iconUrl} />
					<div className='flex flex-col pl-2 w-full'>
						<span className='text-xs font-bold text-secondary-400 truncate pb-1'>{`${item.key} ${item.title}`}</span>
						<div className='flex items-center flex-row space-x-2'>
							<Chip size="sm" classNames={{ content: 'text-[10px]', base: 'p-0 px-1  h-4 bg-[#e8e8f4]' }}>{item.project.name}</Chip>
							{/* 							<Chip size="sm" variant="light" classNames={{ content: 'text-[10px]', base: 'p-0 px-1  h-4 bg-white shadow-md' }}>{item.status.name}</Chip>
 */}						</div>
					</div>
				</div>
				<div className='flex items-center justify-end space-x-2 col-span-4'>
					<Tooltip classNames={{ base: 'text-xs' }} content="Ver detalle de la tarea">
						<Link onPress={onOpen} isBlock showAnchorIcon anchorIcon={<AiOutlineEye className="ml-1" />} className='bg-white shadow-md cursor-pointer rounded-lg text-xs' size='sm' color="primary">
							ver detalles
						</Link>
					</Tooltip>
					{/* <Tooltip classNames={{ base: 'text-xs' }} content="Agregar a tareas">
						<Button onPress={() => hasAdd ? onAdd(item) : onDelete(item)} color="default" size='sm' radius='full' isIconOnly className='bg-none  hover:border-solid-2 hover:!border-green-500' variant="light">
							{hasAdd ? <MdCheckBoxOutlineBlank className=" text-xl" /> : <MdOutlineCheckBox className=" text-xl text-green-700" />}
						</Button>
					</Tooltip> */}
				</div>
			</div>
			<Details isOpen={isOpen} onOpenChange={onOpenChange} item={item} />
		</>
	)
}

export default ItemSubtask
