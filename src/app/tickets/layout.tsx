import React from "react";
import Header from "@/components/header";
import AuthUser from "@/app/auth/auth-user";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function TicketsLayout({
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
