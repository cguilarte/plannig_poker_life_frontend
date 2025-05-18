import React, { useEffect } from 'react'
import { IBodyTableProps, IUser } from '../domain/interfaces'
import { Button, Chip, Popover, PopoverContent, PopoverTrigger, Switch, useDisclosure } from '@nextui-org/react';
import { TfiControlShuffle } from 'react-icons/tfi';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { LiaJira } from 'react-icons/lia';
import useAlert from '@/infrastructure/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/infrastructure/constants';
import { TYPE_USER } from '../domain/userData';
import { repositoryUser } from '../infrastructure/repository';

const BodyTable = ({ row, columnKey, openDetailUser }: IBodyTableProps | any) => {


	const { alertSuccess } = useAlert();
	const [isOpen, setIsOpen] = React.useState(false);
	const router = useRouter();

	const { modelUpdate } = repositoryUser.updateUser(onSuccess);
	const { modelDelete, loading } = repositoryUser.deleteUser(onSuccess);

	const cellValue = row[columnKey as keyof IUser];

	function onSuccess(result: any) {
		setIsOpen(false);
		alertSuccess('Usuario actualizado con éxito.')
	}


	const handleUpdateStatus = () => {
		modelUpdate({
			variables: {
				data: {
					status: !row.status
				},
				userId: row._id
			}
		})
	}

	const handleDeleteUser = () => {
		modelDelete({
			variables: {
				userId: row._id
			}
		})
	}

	switch (columnKey) {
		case "name":
			return (
				<div className='flex flex-col w-80'>
					<span className='text-sm truncate'>{row.name}</span>
				</div>
			);

		case "typePlanning":
			return (
				<>
					{row.rol === TYPE_USER.ADMIN ?
						<Chip size="sm" variant="bordered" classNames={{ content: 'text-xs capitalize' }} startContent={<TfiControlShuffle className=" text-base mr-1" />}> {row.rol}</Chip> :
						<Chip size="sm" variant="bordered" color='primary' classNames={{ content: 'text-xs capitalize' }} startContent={<LiaJira className=" text-base mr-1" />}> {row.rol}</Chip>
					}
				</>
			)

		case "status":
			return (

				<Switch
					onValueChange={(value: boolean) => handleUpdateStatus()}
					defaultSelected={row.status}
					size="sm"
					color='primary'
				>
				</Switch>
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
							<Button color="danger" size='md' startContent={<MdDeleteOutline className="text-lg" />} radius='full' variant="light">
								Eliminar
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-72 flex items-center justify-center flex-col px-2 py-4">
							<h3 className='font-bold text-xs text-center'>¿Estas seguro de eliminar a este usuario?</h3>
							<div className='flex items-center justify-center gap-3 mt-3'>
								<Button size="sm" color='danger' variant="ghost" isLoading={loading} onClick={() => handleDeleteUser()}>Si</Button>
								<Button size="sm" color='primary' variant="flat" onClick={() => setIsOpen(false)}>No</Button>
							</div>
						</PopoverContent>
					</Popover>

					<Button color="primary" startContent={<FiEdit className="text-lg" />} onClick={() => openDetailUser(row._id)} size='md' radius='full' variant="light">
						Editar
					</Button>
				</div>
			);
		default:
			return cellValue;
	}
}

export default BodyTable
