import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingInternal = () => {
	return (
		<div className='backdrop-opacity-10 backdrop-invert bg-white/70 absolute w-full h-full top-0 left-0 flex items-center justify-center z-50'>
			<Spinner size='sm' />
		</div>
	)
}

export default LoadingInternal
