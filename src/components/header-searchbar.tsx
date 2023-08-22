'use client'

import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Searchbar({ className }: { className: string }) {
    const searchRef = useRef<HTMLInputElement>(null)
    const { push } = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const listener = (ev: KeyboardEvent) => {
            if (ev.key == 'Enter') {
                const searchText = searchRef.current!.value.replace(/[^A-Z0-9]/ig, "");
                if (!searchText) return

                setIsLoading(true)
                return push(`/ticket/create/${searchText}`)
            }
        }
        searchRef.current!.addEventListener('keydown', listener)
    }, [])

    return (
        <Input className={className} ref={searchRef} disabled={isLoading} placeholder="Enter a username"/>
    )
}