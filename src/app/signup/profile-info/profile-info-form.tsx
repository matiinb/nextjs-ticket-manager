'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AlertMessage from "@/components/alert-message";
import { SyntheticEvent, useRef, useState } from "react";
import { ArrowRightIcon, ExclamationTriangleIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
// import { useSearchParams } from "next/navigation";

export default function ProfileInfoForm() {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const publicRef = useRef(null)
    // const websiteRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const searchParams = useSearchParams()
    // useEffect(() => {
    //     const paramsError = searchParams.get('error') || ''
    //
    //     if (paramsError !== '') setError(paramsError)
    // }, [])

    function handleSubmit(e: SyntheticEvent) {
        const firstName = firstNameRef.current!.value
        const lastName = lastNameRef.current!.value
        // const website = websiteRef.current!.value

        if (firstName == '' || lastName == '') {
            e.preventDefault()
            return setError("All fields are required")
        }

        setIsLoading(true)
    }


    return (
        <>
            <div className="grid gap-6">
                { (error != '') ? (
                    <AlertMessage icon={<ExclamationTriangleIcon className="w-10 h-10" />} title="Error" message={error}/>
                ) : null }

                <form action="/api/update-account" method="post" onSubmit={handleSubmit}>
                    <input name="redirectPath" type="hidden" value="/dashboard"/>
                    <div className="grid gap-3">
                        <div>
                            <label htmlFor="firstName" className="text-sm font-semibold leading-none">First Name</label>
                            <Input
                                name="firstName"
                                id="firstName"
                                placeholder="e.g. John"
                                type="text"
                                ref={firstNameRef}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="firstName" className="text-sm font-semibold leading-none">Last Name</label>
                            <Input
                                name="lastName"
                                id="lastName"
                                placeholder="e.g. Doe"
                                type="text"
                                ref={lastNameRef}
                                required
                            />
                        </div>

                        <div>
                            <div className="items-top flex space-x-2 mt-2">
                                <Checkbox
                                    name="public"
                                    id="public"
                                    ref={publicRef}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="public"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Public User
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        You will have access to Ticket Manager
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/*<div>*/}
                        {/*    <label htmlFor="website" className="text-sm font-semibold leading-none">Email</label>*/}
                        {/*    <Input*/}
                        {/*        name="website"*/}
                        {/*        id="website"*/}
                        {/*        placeholder=""*/}
                        {/*        type="text"*/}
                        {/*        ref={firstNameRef}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <Button className="mt-2" disabled={isLoading}>
                            { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightIcon className="mr-2 h-4 w-4" /> }
                            Continue
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}