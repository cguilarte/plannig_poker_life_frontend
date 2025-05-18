/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination, Selection, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react'
import LoadingInternal from '../LoadingInternal';
import Image from 'next/legacy/image';
import NotResult from './notResult';

interface IColumnsTable {
	name: string;
	uid: string
}

interface IPagination {
	page: number;
	total: number;
	onChange: (page: number) => void
}


interface ITableProps {
	items: any[];
	columns: IColumnsTable[];
	pagination: IPagination,
	isLoading: boolean,
	renderCell: (user: any, columnKey: React.Key) => string | number | React.JSX.Element;
}


const TableList = ({ items, columns, isLoading = false, renderCell, pagination }: ITableProps) => {

	const INITIAL_VISIBLE_COLUMNS = columns.map((item: any) => item.uid);
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column: any) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const classNames = React.useMemo(
		() => ({
			wrapper: ["max-h-[500px]", "w-full", "mt-8"],
			th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
			td: [
				// changing the rows border radius
				// first
				"group-data-[first=true]:first:before:rounded-none",
				"group-data-[first=true]:last:before:rounded-none",
				// middle
				"group-data-[middle=true]:before:rounded-none",
				// last
				"group-data-[last=true]:first:before:rounded-none",
				"group-data-[last=true]:last:before:rounded-none",
			],
		}),
		[],
	);

	const bottomContent = React.useMemo(() => {
		return (
			<div className={`py-2 flex justify-between items-center`}>
				<Pagination
					showControls
					classNames={{
						cursor: "bg-foreground text-white",
					}}
					color="default"
					initialPage={1}
					isDisabled={false}
					page={pagination?.page}
					total={pagination?.total}
					variant="light"
					onChange={pagination?.onChange}
				/>
				{/* <span className="text-small text-default-400">
					All items selected
				</span> */}
			</div>
		);
	}, [pagination]);

	return (
		<Table
			isCompact
			removeWrapper
			bottomContent={items.length > 0 && bottomContent}
			aria-label="Example table with custom cells, pagination and sorting"
			bottomContentPlacement="outside"
			checkboxesProps={{
				classNames: {
					wrapper: "after:bg-foreground after:text-background text-background",
				},
			}}
			classNames={classNames}
			topContentPlacement="outside"
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
					>
						<strong className=' font-extrabold'>{column.name}</strong>
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				loadingContent={<LoadingInternal />}
				emptyContent={<NotResult />}
				items={items}
				isLoading={isLoading}>
				{(item) => (
					<TableRow key={item._id}>
						{(columnKey,) => <TableCell>{renderCell(item, columnKey as any)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default TableList