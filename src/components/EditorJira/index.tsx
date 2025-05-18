import React from 'react'
interface EProps { body: string, viewOnly: boolean };

export default function EditorJira({ viewOnly, body }: EProps) {
	return (
		<div>
			{body}
		</div>
	)
}
