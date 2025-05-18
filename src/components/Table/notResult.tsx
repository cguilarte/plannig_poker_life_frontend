import Image from 'next/legacy/image'
import React from 'react'

function NotResult() {
	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<div className="w-72 h-72 relative">
				<Image src="/img/file-not-found.svg" priority objectFit='cover' layout="fill" alt="Planning create" />
				<span className='text-sm text-secondary-200 absolute bottom-4 left-0 text-center w-full'>Sin resultados</span>
			</div>
		</div>
	)
}

export default NotResult