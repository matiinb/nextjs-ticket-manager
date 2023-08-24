import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignupForm from "@/app/signup/signup-form";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import AuthUser from "@/app/auth/auth-user"
import { redirect } from "next/navigation"

export default async function Signup() {
    const { userData } = await AuthUser()
    userData && redirect('/dashboard')

    return (
        <>
            <Link href={"/"}>
                <Button
                    variant="ghost"
                    className="absolute right-4 top-4 md:right-8 md:top-8"
                >
                    Home
                </Button>
            </Link>

            <div className="mx-auto flex w-full flex-col justify-center align-middle space-y-6 sm:w-[350px]">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">Enter the email and password below</p>
                </div>

                <SignupForm/>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                </div>

                <Link href={"/login"}>
                    <Button variant="outline" className="w-full">
                        <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                        Login with Email
                    </Button>
                </Link>
            </div>
        </>
    )
}