"use client";

import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";

interface INextAuthSessionProviderProps {
	children?: React.ReactNode;
}

export const NextAuthSessionProvider: FC<INextAuthSessionProviderProps> = ({
	children,
}) => {
	return <SessionProvider>{children}</SessionProvider>;
};
