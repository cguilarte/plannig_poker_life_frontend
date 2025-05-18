"use client";

import { TitlePage } from '@/components'
import TableList from '@/components/Table';
import React, { useEffect, useState } from 'react'
import { columnsTable, metadata } from './core/domain/teamData';
import { BodyTable, Filter } from './core/ui';
import { useDisclosure } from '@nextui-org/react';
import ModalEdit from './core/ui/ModalEdit';
import { repositoryTeam } from './core/infrastructure/repository';
import { ITeam } from './core/domain/interfaces';
import ModalInvite from './core/ui/ModelInvite';
import LayoutPrivate from '@/infrastructure/providers/LayoutPrivate';

const Teams = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { isOpen: isOpenInvite, onOpen: onOpenInvite, onOpenChange: onOpenChangeInvite } = useDisclosure();
	const [teamId, setTeamId] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [filters, setFilter] = useState({});
	const { data: list, loading } = repositoryTeam.listTeam(filters, page);

	const handleDetailTeam = (teamId: string) => {
		setTeamId(teamId);
		onOpen();
	}

	const handleListInvite = (teamId: string) => {
		setTeamId(teamId);
		onOpenInvite();
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
						renderCell={(row: ITeam, columnKey: React.Key) => <BodyTable openDetailTeam={handleDetailTeam} handleListInvite={handleListInvite} row={row} columnKey={columnKey} />}
						pagination={{ page: list?.currentPage, total: list?.numberOfPages, onChange: (page) => setPage(page) }} />
				</div>
				{isOpen && <ModalEdit teamId={teamId} isOpen={isOpen} onOpenChange={onOpenChange} />}
				{isOpenInvite && <ModalInvite teamId={teamId} isOpen={isOpenInvite} onOpenChange={onOpenChangeInvite} />}

			</div>
		</LayoutPrivate>
	)
}

export default Teams