"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ArrowRightIcon, UpdateIcon} from "@radix-ui/react-icons";
import {useRef, useState} from "react"
import { useRouter } from "next/navigation"

export default function CreateTicket() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { push } = useRouter()

    function handleRedirect() {
        if (usernameRef.current!.value == '') return
        setIsLoading(true)
        push(`/t/create/${usernameRef.current!.value}`)
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create a ticket</CardTitle>
                <CardDescription>
                    Enter the recipient username below to create a ticket
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        ref={usernameRef}
                        type="username"
                        placeholder="coolusername123" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleRedirect} disabled={isLoading}>
                    { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightIcon className="mr-2 h-4 w-4" /> }
                    Continue
                </Button>
            </CardFooter>
        </Card>
    )
}