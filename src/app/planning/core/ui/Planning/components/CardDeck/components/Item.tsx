import React from 'react'

interface IProps {
	selected?: boolean;
	name: string | number;
	onSelect: React.Dispatch<React.SetStateAction<string | null | number>>;
	showCard: boolean;
	modeObserver: boolean;
}

const Item = ({ selected = false, name, showCard = false, modeObserver, onSelect }: IProps) => {
	return (
		<div onClick={() => {
			if (!showCard && !modeObserver) onSelect(name)
		}} className={`w-12 h-16 p-1.5 rounded-md shadow-card relative text-lg group flex items-center justify-center ring-5 ring-transparent transition-all ${showCard || modeObserver ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:ring-2 hover:ring-primary  hover:-translate-y-2'} ${selected ? 'bg-white dark:bg-default !opacity-100 text-white -translate-y-3  animation-pulse' : 'bg-white dark:bg-default dark:text-white  text-secondary-400'}`}>
			<span className={`rounded-full w-4 h-4 bg-white absolute left-1 top-1 text-[8px] dark:bg-default ${selected ? 'text-primary font-bold ' : 'text-secondary-300'} group-hover:text-primary group-hover:dark:text-white  font-bold flex items-center justify-center`}>{name}</span>
			<div className={`bg-secondary-100/50 rounded-md w-full h-full flex items-center justify-center dark:bg-background ${selected ? 'bg-primary-200 dark:bg-white text-primary font-bold ' : ''} group-hover:bg-primary-200 group-hover:text-primary`}>{name}</div>
			<span className={`rounded-full w-4 h-4 bg-white absolute right-1 bottom-1 text-[8px] dark:bg-default ${selected ? ' text-primary font-bold ' : 'text-secondary-300'} group-hover:text-primary group-hover:dark:text-white font-bold flex items-center justify-center`}>{name}</span>
		</div >
	)
}

export default Item
