"use client";

import { TitlePage } from '@/components'
import TableList from '@/components/Table';
import React, { useEffect, useState } from 'react'
import { columnsTable, metadata } from './core/domain/userData';
import { BodyTable, Filter } from './core/ui';
import { IUser } from './core/domain/interfaces';
import { repositoryUser } from './core/infrastructure/repository';
import { useDisclosure } from '@nextui-org/react';
import ModalEditUser from './core/ui/ModalEditUser';
import LayoutPrivate from '@/infrastructure/providers/LayoutPrivate';

const Users = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [userId, setUserId] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [filters, setFilter] = useState({});
	const { data: list, fetchMore, loading } = repositoryUser.listUser(filters, page);

	const handleDetailUser = (userId: string) => {
		setUserId(userId);
		onOpen();
	}

	return (
		<LayoutPrivate>

			<div className="flex flex-col">
				<TitlePage
					title={`${metadata.title}`}
					heading={metadata.heading}
					description={metadata.description}
				/>

				{/* Filtro */}
				<Filter onfilters={setFilter} filters={filters} />

				{/* Lista */}
				<div className='flex flex-col mt-4'>
					<TableList
						isLoading={loading}
						columns={columnsTable}
						items={list?.data.length > 0 ? list.data.map((row: any, index: number) => {
							row.position = index + 1;
							return row;
						}) : []}
						renderCell={(row: IUser, columnKey: React.Key) => <BodyTable openDetailUser={handleDetailUser} row={row} columnKey={columnKey} />}
						pagination={{ page: list?.currentPage, total: list?.numberOfPages, onChange: (page) => setPage(page) }} />
				</div>
				{isOpen && <ModalEditUser userId={userId} isOpen={isOpen} onOpenChange={onOpenChange} />}
			</div>
		</LayoutPrivate>

	)
}

export default Users