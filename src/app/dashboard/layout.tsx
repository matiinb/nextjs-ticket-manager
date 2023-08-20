import type { Metadata } from 'next'
import React from "react";
import Header from "@/components/header";
import AuthUser from "@/app/auth/auth-user";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
    title: 'Dashboard - Ticket Manager',
    description: 'A Web Application created using NextJS',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const {
        data: { user },
    } = await AuthUser()

    !user && redirect('/login')

    return (
        <>
            <Header email={user!.email!}/>
            {children}
        </>
    )
}
