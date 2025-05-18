"use client";

import Image from 'next/legacy/image'
import React from 'react'
import Menu from './Menu'
import CardProfile from './CardProfile'

const NavSidebar = () => {
	return (
		<nav className='h-full sticky top-0 flex flex-col p-4 bg-[#202228] w-full'>
			<div className='relative w-48 h-8'>
				<Image src='/img/logo.svg' alt='Logo Planning poker life' layout="fill" objectFit="contain" />
			</div>
			<div className='flex flex-col mt-8 h-full justify-between'>
				<ul className='space-y-4'>
					<Menu />
				</ul>
				<CardProfile />
			</div>
		</nav>
	)
}

export default NavSidebar