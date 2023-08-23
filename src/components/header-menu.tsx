'use client'

import Link from "next/link"
// import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface IntrinsicElements extends React.HTMLAttributes<HTMLElement> {
    linkClassName?: string
}

export default function HeaderMenu({
    className
}: IntrinsicElements) {

    // const defaultClass = cn("font-regular transition-colors hover:text-primary", linkClassName)
    const menuItems = [
        {
            text: "Dashboard",
            link: "/dashboard"
        },
        {
            text: "Tickets",
            submenu: [
                {
                    text: "Ticket Manager",
                    link: "/tickets/manage"
                },
                {
                    text: "Ticket List",
                    link: "/tickets/list"
                },
            ]
        },
        {
            text: "Settings",
            link: "/settings"
        },
    ]

    return (
        <NavigationMenu className={className}>
            <NavigationMenuList className="flex-col sm:flex-row">
                {menuItems.map((item, index) => {
                    if (!item.submenu) return (
                        <NavigationMenuItem className="max-sm:w-full max-sm:!ml-0 max-sm:mb-2" key={index}>
                            <Link href={item.link} legacyBehavior passHref>
                                <NavigationMenuLink className={"max-sm:!text-lg max-sm:!h-10 max-sm:font-light " + navigationMenuTriggerStyle()}>
                                    {item.text}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )

                    return (
                        <NavigationMenuItem className="max-sm:w-full max-sm:!ml-0 max-sm:mb-2" key={index}>
                            <NavigationMenuTrigger className="max-sm:!text-lg max-sm:!h-10 max-sm:font-light">{item.text}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col gap-3 w-[200px] p-4">
                                    {
                                        item.submenu.map((item, index) => {
                                            return (
                                                <NavigationMenuItem key={index}>
                                                    <Link href={item.link} legacyBehavior passHref>
                                                        <NavigationMenuLink className={"!w-full !justify-start " + navigationMenuTriggerStyle()}>
                                                            {item.text}
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </NavigationMenuItem>
                                            )
                                        })
                                    }
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
            {/*<Link*/}
            {/*    href={"/"}*/}
            {/*    className={defaultClass + " text-muted-foreground"}*/}
            {/*>*/}
            {/*    Home*/}
            {/*</Link>*/}
        </NavigationMenu>
    )
}