'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AlertMessage from "@/components/alert-message";
// import { Checkbox } from "@/components/ui/checkbox"
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { ExclamationTriangleIcon, PersonIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
// import ValidateSignup from "@/app/auth/sign-up/validate-signup"

export default function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams()
    useEffect(() => {
        const paramsError = searchParams.get('error') || ''

        if (paramsError !== '') setError(paramsError)
    }, [])

    function handleSubmit(e: SyntheticEvent) {
        const email = emailRef.current!.value
        const password = passwordRef.current!.value

        if (email == '' || password == '') {
            e.preventDefault()
            return setError('All fields are required')
        }

        setIsLoading(true)
    }


    return (
        <>
            <div className="grid gap-6">
                { (error != '') ? (
                    <AlertMessage icon={<ExclamationTriangleIcon className="w-10 h-10" />} title="Error" message={error}/>
                ) : null }

                <form action="/auth/sign-in" method="post" onSubmit={handleSubmit}>
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

                        <Button className="mt-2">
                            { isLoading ? <UpdateIcon className="mr-2 h-4 w-4 animate-spin" /> : <PersonIcon className="mr-2 h-4 w-4" /> }
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}