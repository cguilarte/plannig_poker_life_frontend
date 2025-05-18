import React from 'react'

interface IProps {
	color?: string;
}

export const ChevronDownIcon = ({ color = 'currentColor' }: IProps) => {
	return (
		<svg aria-hidden="true" fill="none" focusable="false" height="1.5em" role="presentation" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="1em" className="text-white" tabIndex={-1}><path d="m6 9 6 6 6-6"></path></svg>

	)
}
