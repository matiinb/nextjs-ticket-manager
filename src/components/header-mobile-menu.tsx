'use client'

import HeaderMenu from "@/components/header-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon className="h-5 w-5"/>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-3xl mb-5">Menu</SheetTitle>
                    <HeaderMenu
                        className="flex flex-col space-y-3"
                        linkClassName="text-lg"
                    />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}