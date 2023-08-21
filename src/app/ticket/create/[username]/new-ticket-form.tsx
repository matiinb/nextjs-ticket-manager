'use client'

import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import AlertMessage from "@/components/alert-message";
import {CheckCircledIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function ProfileForm({ destUsername }: { destUsername: string }) {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const titleRef = useRef<HTMLInputElement>(null)
    const textRef = useRef<HTMLTextAreaElement>(null)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paramsError = searchParams.get('error') || ''
        const paramsStatus = searchParams.get('status') || ''

        if (paramsError !== '') setError(paramsError)
        if (paramsStatus === 'success') setMessage('Successfully created a ticket')
    }, [])

    function handleSubmit(e: SyntheticEvent) {
        if (titleRef.current!.value.length < 5 || textRef.current!.value.length < 10) {
            e.preventDefault()
            setError('The title should be 5 and the text should be 10 letters at least')
        }

        setIsLoading(true)
    }

    return (
        <>
            <h1 className="text-3xl mb-4 font-bold tracking-tight">
                Send a ticket to {destUsername}
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

            <form action="/api/create-ticket" method="post" onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="destUsername" value={destUsername}/>

                <div>
                    <span className="text-sm font-semibold">Ticket Title</span>
                    <Input
                        name="title"
                        ref={titleRef}
                        placeholder="Service cancellation request"
                    />
                </div>
                <div>
                    <span className="text-sm font-semibold">Ticket Text</span>
                    <Textarea
                        name="text"
                        ref={textRef}
                        className="h-40"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, fugiat repellat! Cum distinctio rerum ullam!"
                    />
                </div>
                <Button type="submit" disabled={isLoading}>Submit</Button>
            </form>
        </>
    )
}