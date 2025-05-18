"use client";
import '../../app/globals.css'

import React from 'react';
import { NavSidebar } from '@/components';
import dynamic from 'next/dynamic';

const WrapperProviders = dynamic(() => import('@/infrastructure/providers/WrapperProviders'), { ssr: false })

export default function LayoutPrivate({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<WrapperProviders>
			<div className='grid grid-cols-12'>
				<div className='col-span-2'>
					<NavSidebar />
				</div>
				<div className="col-span-10">
					<div className='bg-white h-screen p-10 overflow-y-auto'>
						{children}
					</div>
				</div>
			</div>
		</WrapperProviders>

	)
}
