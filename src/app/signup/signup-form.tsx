'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AlertMessage from "@/components/alert-message";
// import { Checkbox } from "@/components/ui/checkbox"
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import { ExclamationTriangleIcon, PersonIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import ValidateSignup from "@/app/auth/sign-up/validate-signup"

export default function SignupForm() {
    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paramsError = searchParams.get('error') || ''

        if (paramsError !== '') setError(paramsError)
    }, [])

    function handleSubmit(e: SyntheticEvent) {
        const email = emailRef.current!.value
        const username = usernameRef.current!.value
        const password = passwordRef.current!.value
        const passwordConf = passwordConfRef.current!.value

        const validation = ValidateSignup({email, username, password, passwordConf})

        if (validation != '') {
            e.preventDefault()
            return setError(validation)
        }

        setIsLoading(true)
    }


    return (
        <>
            <div className="grid gap-6">
                { (error != '') ? (
                    <AlertMessage icon={<ExclamationTriangleIcon className="w-10 h-10" />} title="Error" message={error}/>
                ) : null }

                <form action="/auth/sign-up" method="post" onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold leading-none">Email</label>
                            <Input
                                name="email"
                                id="email"
                                placeholder="johndoe@email.com"
                                type="email"
                                ref={emailRef}
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="text-sm font-semibold leading-none">Username</label>
                            <Input
                                name="username"
                                id="username"
                                placeholder="johndoe"
                                type="text"
                                ref={usernameRef}
                                autoCapitalize="none"
                                autoCorrect="off"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-semibold leading-none">Password</label>
                            <Input
                                name="password"
                                id="password"
                                placeholder="password123"
                                type="password"
                                ref={passwordRef}
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="passwordConf" className="text-sm font-semibold leading-none">Password Confirmation</label>
                            <Input
                                name="passwordConf"
                                id="passwordConf"
                                placeholder="password123"
                                type="password"
                                ref={passwordConfRef}
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                required
                            />
                        </div>

                        {/*<div className="items-top flex space-x-2 mt-3">*/}
                        {/*    <Checkbox id="public"/>*/}
                        {/*    <div className="grid gap-1.5 leading-none">*/}
                        {/*        <label*/}
                        {/*            htmlFor="public"*/}
                        {/*            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                        {/*        >*/}
                        {/*            Public User*/}
                        {/*        </label>*/}
                        {/*        <p className="text-sm text-muted-foreground">*/}
                        {/*            You will have access to Ticket Manager*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <Button className="mt-2">
                            { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <PersonIcon className="mr-2 h-4 w-4" /> }
                            Sign Up with Email
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}