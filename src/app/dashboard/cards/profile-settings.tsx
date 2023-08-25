"use client"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {ArrowRightIcon, UpdateIcon} from "@radix-ui/react-icons";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfileSettings() {
    // const usernameRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { push } = useRouter()

    function handleRedirect() {
        // if (usernameRef.current!.value == '') return
        setIsLoading(true)
        push(`/settings/`)
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Change Profile Settings</CardTitle>
                <CardDescription>
                    You can change your First and Last name in the Profile Settings
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleRedirect} disabled={isLoading}>
                    { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightIcon className="mr-2 h-4 w-4" /> }
                    Go to Settings
                </Button>
            </CardFooter>
        </Card>
    )
}