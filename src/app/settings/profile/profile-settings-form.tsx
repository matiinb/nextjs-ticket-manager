'use client'

import { Input } from "@/components/ui/input"
import {CheckCircledIcon, Pencil1Icon, UpdateIcon} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useState, useRef, SyntheticEvent, useEffect } from "react"
import {useSearchParams} from "next/navigation";
import AlertMessage from "@/components/alert-message";

export default async function ProfileSettingsForm({fname, lname}: {fname: string, lname: string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams()

    // Fill out the fields with the values stored in the DB
    useEffect(() => {
        firstNameRef.current!.value = fname
        lastNameRef.current!.value = lname
        const paramsStatus = searchParams.get('status') || ''

        if (paramsStatus === 'success') setMessage('Successfully updated the profile')
    }, [])

    function handleSubmit(e: SyntheticEvent) {

        // Make sure the user isn't resending the same data again
        if (firstNameRef.current!.value == ''
            || lastNameRef.current!.value == ''
            || (firstNameRef.current!.value == fname && lastNameRef.current!.value == lname)
        ) {
            e.preventDefault()
            return setIsLoading(false)
        }

        setIsLoading(true)
    }

    return (
        <>
            {message && (
                <AlertMessage
                    icon={<CheckCircledIcon className="w-10 h-10" />}
                    title="Success" message={message}
                    className="max-w-[400px]"
                />
            )}

            <form action="/api/update-profile" method="post" onSubmit={handleSubmit} className="space-y-6">
                <input name="redirectPath" type="hidden" value="/settings"/>
                <div className="max-w-[400px]">
                    <label htmlFor="firstName" className="text-sm font-semibold leading-none">First Name</label>
                    <Input
                        name="firstName"
                        id="firstName"
                        ref={firstNameRef}
                        placeholder="e.g. John"
                        required
                    />
                </div>

                <div className="max-w-[400px]">
                    <label htmlFor="lastName" className="text-sm font-semibold leading-none">Last Name</label>
                    <Input
                        name="lastName"
                        id="lastName"
                        ref={lastNameRef}
                        placeholder="e.g. Doe"
                        required
                    />
                </div>

                <Button className="mt-6" disabled={isLoading}>
                    { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <Pencil1Icon className="mr-2 h-4 w-4" /> }
                    Update
                </Button>
            </form>
        </>
    )
}