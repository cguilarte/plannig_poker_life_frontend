"use client";

import { TitlePage } from '@/components'
import TableList from '@/components/Table';
import React, { useEffect, useState } from 'react'
import { columnsPlanning, metadata } from './core/domain/planningData';
import { BodyTable, Filter } from './core/ui';
import { repositoryPlanning } from './core/infrastructure/repository';
import { deleteAccessToken } from './core/infrastructure/utils';
import { IPlanning } from './core/domain/interfaces';
import LayoutPrivate from '@/infrastructure/providers/LayoutPrivate';

const Planning = () => {
	const [page, setPage] = useState(1);
	const [filters, setFilter] = useState({});
	const { data: list, fetchMore, loading } = repositoryPlanning.getPlannings(filters, page);

	useEffect(() => {
		deleteAccessToken();
	}, []);

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
						columns={columnsPlanning}
						items={list?.data.length > 0 ? list.data.map((row: any, index: number) => {
							row.position = index + 1;
							return row;
						}) : []}
						renderCell={(row: IPlanning, columnKey: React.Key) => <BodyTable row={row} columnKey={columnKey} />}
						pagination={{ page: list?.currentPage, total: list?.numberOfPages, onChange: (page) => setPage(page) }} />
				</div>
			</div>
		</LayoutPrivate>
	)
}

export default Planning