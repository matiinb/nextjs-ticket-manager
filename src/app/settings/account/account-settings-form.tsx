'use client'

import { Input } from "@/components/ui/input"
import {CheckCircledIcon, Pencil1Icon, UpdateIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useState, useRef, SyntheticEvent, useEffect } from "react"
import {useSearchParams} from "next/navigation";
import AlertMessage from "@/components/alert-message";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {SwitchProps} from "@radix-ui/react-switch";


export default function AccountSettingsForm({username, isPublic}: {username: string, isPublic: boolean}) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    // State for switch toggle
    const [isChecked, setIsChecked] = useState(isPublic)
    const usernameRef = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams()

    // Fill out the fields with the values stored in the DB
    useEffect(() => {
        usernameRef.current!.value = username

        const paramsStatus = searchParams.get('status') || ''

        if (paramsStatus === 'success') setMessage('Successfully updated the account')
    }, [])

    function handleSubmit(e: SyntheticEvent) {
        // Make sure the user isn't resending the same data again
        if (usernameRef.current!.value == ''
            || (usernameRef.current!.value == username && isChecked == isPublic)
        ) {
            e.preventDefault()
            return setIsLoading(false)
        }

        setIsLoading(true)
        // e.preventDefault()
    }

    // Toggle the button
    const switchHandle = () => setIsChecked(prevState => !prevState)

    return (
        <>
            {message && (
                <AlertMessage
                    icon={<CheckCircledIcon className="w-10 h-10" />}
                    title="Success" message={message}
                    className="max-w-[400px]"
                />
            )}

            <form action="/api/update-account" method="post" onSubmit={handleSubmit} className="space-y-6">
                <input name="redirectPath" type="hidden" value="/settings/account"/>
                <div className="max-w-[400px]">
                    <label htmlFor="username" className="text-sm font-semibold leading-none">Username</label>
                    <Input
                        name="username"
                        id="username"
                        ref={usernameRef}
                        placeholder="e.g. John"
                        required
                        disabled
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <span className="text-sm font-bold">Public User</span><br/>
                            <span className="text-sm text-muted-foreground">
                                You will have access to Ticket Manager if you are a public user.
                                Your tickets will not be deleted if you make your account private.
                            </span>
                        </div>
                            <Switch
                                name="public"
                                checked={isChecked}
                                onCheckedChange={switchHandle}
                            />
                    </div>
                </div>

                <Button className="mt-6" disabled={isLoading}>
                    { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <Pencil1Icon className="mr-2 h-4 w-4" /> }
                    Update
                </Button>
            </form>
        </>
    )
}