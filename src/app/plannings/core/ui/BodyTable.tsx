import React from 'react'
import { IBodyTableProps, IGuest, IPlanning } from '../domain/interfaces'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { HiOutlineExternalLink } from 'react-icons/hi'
import { GoCopy } from 'react-icons/go';
import { TfiControlShuffle } from 'react-icons/tfi';
import { STATUS_PLANNING_LANG, STATUS_PLANNING_RECORD, TypePlanning } from '../domain/planningData';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { LiaJira } from 'react-icons/lia';
import { copyLink } from '../infrastructure/utils';
import useAlert from '@/infrastructure/hooks/useAlert';
import { repositoryPlanning } from '../infrastructure/repository';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/infrastructure/constants';

const BodyTable = ({ row, columnKey }: IBodyTableProps | any) => {
	const { alertSuccess } = useAlert();
	const [isOpen, setIsOpen] = React.useState(false);
	const router = useRouter();

	const { deletePlanning, loading } = repositoryPlanning.deletePlanning(onSuccessDelete);


	function onSuccessDelete(result: boolean) {
		if (result) {
			setIsOpen(false);
			alertSuccess('Planning eliminada con exito.')
		}
	}

	const cellValue = row[columnKey as keyof IPlanning];

	switch (columnKey) {
		case "title":
			return (
				<div className='flex flex-col w-80'>
					<span className='text-sm truncate'>{row.title}</span>
					<span className='text-xs text-secondary-300 truncate'>{row.description}</span>
				</div>
			);
		case "planningId":
			return (
				<Dropdown>
					<DropdownTrigger>
						<Button size="sm" variant='flat' radius='full' className='cursor-pointer text-xs capitalize underline text-primary'>Planning ID</Button>
					</DropdownTrigger>
					<DropdownMenu
						variant="flat"
						aria-label="Dropdown menu with shortcut"
						onAction={(key) => {
							if (key === 'copy') copyLink(`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${row.planningId}`).then(() => alertSuccess('ID copiado con éxito.'))
						}}
					>
						<DropdownItem key="link" startContent={<HiOutlineExternalLink />}><Link isExternal showAnchorIcon size='sm' href={`${process.env.NEXT_PUBLIC_URL_FRONT}/${ROUTER.planningLiveUrl}/${row.planningId}`}>Ir a planning live</Link></DropdownItem>
						<DropdownItem key="copy" startContent={<GoCopy />}>Copiar link para compartir</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			);
		case "typePlanning":
			return (
				<>
					{row.typePlanning === TypePlanning.MANUAL ?
						<Chip size="sm" variant="bordered" classNames={{ content: 'text-xs capitalize' }} startContent={<TfiControlShuffle className=" text-base mr-1" />}> {row.typePlanning}</Chip> :
						<Chip size="sm" variant="bordered" color='primary' classNames={{ content: 'text-xs capitalize' }} startContent={<LiaJira className=" text-base mr-1" />}> {row.typePlanning}</Chip>
					}
				</>
			)
		case "systemCard":
			return (
				<Chip size="sm" variant="bordered" classNames={{ content: 'text-xs' }}>{row.systemCard}</Chip>

			)
		case "storyPoint":
			return (
				<Chip size="sm" variant='flat' classNames={{ content: 'text-xs' }}>{row.storyPoint}</Chip>
			)
		case "status":
			return (
				<Chip
					classNames={{
						content: `${row.status === STATUS_PLANNING_RECORD.PENDING ? 'text-[#F4A423]' : 'text-green-400'} text-xs font-bold`
					}}
					color={`${row.status === STATUS_PLANNING_RECORD.PENDING ? 'warning' : 'success'}`
					}
					size="sm"
					variant='bordered'
				>
					{STATUS_PLANNING_LANG[row.status]}
				</Chip >
			);
		case "actions":
			return (
				<div className="relative flex  items-center gap-1">
					<Popover
						key="opaque"
						showArrow
						offset={10}
						placement="bottom"
						backdrop='blur'
						isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}
					>
						<PopoverTrigger>
							<Button color="danger" isIconOnly size='md' radius='full' variant="light">
								<MdDeleteOutline className="text-lg" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-72 flex items-center justify-center flex-col px-2 py-4">
							<h3 className='font-bold text-xs text-center'>¿Estas seguro de eliminar esta planning?</h3>
							<div className='flex items-center justify-center gap-3 mt-3'>
								<Button size="sm" color='danger' isLoading={loading} variant="ghost" onClick={() => deletePlanning({ variables: { planningId: row._id } })}>Si</Button>
								<Button size="sm" color='primary' variant="flat" onClick={() => setIsOpen(false)}>No</Button>
							</div>
						</PopoverContent>
					</Popover>

					<Button color="primary" onClick={() => router.push(`${ROUTER.plannings.form}?id=${row.planningId}`)} isIconOnly size='md' radius='full' variant="light">
						<FiEdit className="text-lg" />
					</Button>
				</div>
			);
		default:
			return cellValue;
	}
}

export default BodyTable
