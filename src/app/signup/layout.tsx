import type { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'Signup - Ticket Manager',
    description: 'A Web Application created using NextJS',
}

export default async function TicketsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-auto min-h-full pb-8 lg:pb-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 auth-bg"></div>
                </div>
                <div className="pt-20 md:pt-0 lg:px-8">
                    {children}
                </div>
            </div>
        </>
    )
}
