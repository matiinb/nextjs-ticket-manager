'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"

interface IntrinsicElements extends React.HTMLAttributes<HTMLElement> {
    linkClassName?: string
}

export default function HeaderMenu({
    className, linkClassName
}: IntrinsicElements) {

    const defaultClass = cn("font-regular transition-colors hover:text-primary", linkClassName)

    return (
        <nav className={className}>
            <Link
                href={"/"}
                className={defaultClass + " text-muted-foreground"}
            >
                Home
            </Link>

            <Link
                href={"/dashboard"}
                className={defaultClass}
            >
                Dashboard
            </Link>

            <Link
                href={"/settings"}
                className={defaultClass + " text-muted-foreground"}
            >
                Settings
            </Link>

            <Link
                href={"/tickets"}
                className={defaultClass + " text-muted-foreground"}
            >
                Tickets
            </Link>
        </nav>
    )
}