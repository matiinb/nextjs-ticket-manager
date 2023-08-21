'use client'

import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import AlertMessage from "@/components/alert-message";
import {CheckCircledIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function ReplyForm({ ticketID, ticketTitle }: { ticketID: string, ticketTitle: string }) {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const textRef = useRef<HTMLTextAreaElement>(null)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paramsError = searchParams.get('error') || ''
        const paramsStatus = searchParams.get('status') || ''

        if (paramsError !== '') setError(paramsError)
        if (paramsStatus === 'success') setMessage('Successfully added a reply')
    }, [])

    function handleSubmit(e: SyntheticEvent) {
        if (textRef.current!.value.length < 2) {
            e.preventDefault()
            setError('The reply should be at least 2 characters')
        }

        setIsLoading(true)
    }

    return (
        <>
            <h1 className="text-3xl mb-4 font-bold tracking-tight">
                Add a reply to '{ticketTitle}'
            </h1>

            {error && (
                <AlertMessage
                    icon={<ExclamationTriangleIcon className="w-10 h-10" />}
                    title="Error" message={error}/>
            )}
            {message && (
                <AlertMessage
                    icon={<CheckCircledIcon className="w-10 h-10" />}
                    title="Success" message={message}/>
            )}

            <form action="/api/create-reply" method="post" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="ticketID" value={ticketID}/>

                <div>
                    <span className="text-sm font-semibold">Reply Text</span>
                    <Textarea
                        name="text"
                        ref={textRef}
                        className="h-40"
                        placeholder="e.g. Thanks for the quick response!"
                    />
                </div>
                <Button type="submit" disabled={isLoading}>Submit</Button>

                <Link href={`/ticket/view/${ticketID}`}>
                    <Button variant="destructive" className="ml-4">Cancel</Button>
                </Link>
            </form>
        </>
    )
}