'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";

type LinkButton = {
    className: string,
    href: string,
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    children: React.ReactNode
}

export default function LinkButton({ className, href, variant, children }: LinkButton) {
    return (
        <Link href={href}>
            <Button className={className} variant={variant}>
                {children}
            </Button>
        </Link>
    )
}