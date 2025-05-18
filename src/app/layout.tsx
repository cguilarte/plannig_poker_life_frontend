"use client";

import WrapperProvidersInternal from '@/infrastructure/providers/WrapperProvidersInternal';
import './globals.css'
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <WrapperProvidersInternal>
      {children}
    </WrapperProvidersInternal>
  )
}