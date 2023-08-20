'use client'

import HeaderMenu from "@/components/header-menu";
import MobileMenu from "@/components/header-mobile-menu";
import HeaderUser from "@/components/header-user";

export default function Header({ username, email }: { username: string, email: string }) {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-8">
                <div>
                    <div className="hidden sm:block">
                        <HeaderMenu className="flex space-x-6"/>
                    </div>
                    <div className="sm:hidden h-5">
                        <MobileMenu/>
                    </div>
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    <HeaderUser username={username} email={email}/>
                </div>
            </div>
        </div>
    )
}