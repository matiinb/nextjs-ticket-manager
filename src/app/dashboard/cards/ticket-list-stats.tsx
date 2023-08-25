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
import {ArrowRightIcon, InfoCircledIcon, UpdateIcon} from "@radix-ui/react-icons";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TicketListStats({ ticketsCount } : { ticketsCount: number }) {
    // const usernameRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { push } = useRouter()

    function handleRedirect() {
        // if (usernameRef.current!.value == '') return
        setIsLoading(true)
        push(`/tickets/list`)
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Ticket List Stats</CardTitle>
                <CardDescription>
                    You can see the number of tickets you've sent here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md p-4 flex items-center gap-2">
                    <InfoCircledIcon className="h-5 w-5"/>
                    <span className="text-sm">
                        You have <b>{ticketsCount}</b> tickets in the Tickets List
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full" onClick={handleRedirect} disabled={isLoading}>
                    { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightIcon className="mr-2 h-4 w-4" /> }
                    Go to Tickets List
                </Button>
            </CardFooter>
        </Card>
    )
}