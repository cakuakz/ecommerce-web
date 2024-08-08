'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import * as React from 'react'

export interface ProvidersProps {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export const Providers = ({ children }: ProvidersProps) => {

	return (
		<SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
	)
};