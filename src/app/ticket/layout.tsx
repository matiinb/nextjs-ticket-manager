import type { Metadata } from 'next'
import React from "react";
import Header from "@/components/header";
import AuthUser from "@/app/auth/auth-user";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Create Ticket - Ticket Manager',
    description: 'A Web Application created using NextJS',
}

export default async function TicketLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { userData } = await AuthUser()
    !userData && redirect('/login')

    return (
        <div className="h-auto min-h-full flex flex-col">
            <Header username={userData!.username} email={userData!.email}/>
            <div className="flex-1 flex">
                {children}
            </div>
        </div>
    )
}