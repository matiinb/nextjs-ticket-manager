import type { Metadata } from 'next'
import React from "react";
import Header from "@/components/header";
import AuthUser from "@/app/auth/auth-user";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'User - Ticket Manager',
    description: 'A Web Application created using NextJS',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { userData } = await AuthUser()
    !userData && redirect('/login')

    return (
        <>
            <Header username={userData!.username} email={userData!.email}/>
            <div className="container mt-8">
                {children}
            </div>
        </>
    )
}
