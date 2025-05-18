"use client";
import React from 'react'
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./core/ui/Form'), { ssr: false })

export default function Page() {
	return (
		<Form />
	)
}
