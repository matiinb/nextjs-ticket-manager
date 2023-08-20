'use client'

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function HeaderUser({ email }: { email: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            <PersonIcon className="h-4 w-4"/>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={"/dashboard"}>
                        <DropdownMenuItem>
                            Dashboard
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/profile"}>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/tickets"}>
                        <DropdownMenuItem>
                            Tickets
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <form action="/auth/sign-out" method="post">
                    <button type="submit" className="w-full">
                        <DropdownMenuItem>Log Out</DropdownMenuItem>
                    </button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}