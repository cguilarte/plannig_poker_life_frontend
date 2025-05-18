"use client";

import React from 'react';
import { NextUIThemeProvider } from '@/infrastructure/providers/NextUIThemeProvider';
import { ApolloWrapper } from '@/infrastructure/providers/ApolloWrapper';
import ReduxProvider from '@/infrastructure/providers/ReduxProvider';
import { SessionProvider } from 'next-auth/react';

import { ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function WrapperProvidersInternal({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<html lang="en">
			<body className="bg-background">
				<ReduxProvider>
					<SessionProvider>
						<ApolloWrapper>
							<NextUIThemeProvider>
								<>{children}</>
								<ToastContainer transition={Zoom} theme="light" />
							</NextUIThemeProvider>
						</ApolloWrapper>
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
