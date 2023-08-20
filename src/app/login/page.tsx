import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import AuthUser from "@/app/auth/auth-user"
import { redirect } from "next/navigation"
import LoginForm from "@/app/login/login-form";

export default async function Login() {
    const { userData } = await AuthUser()
    userData && redirect('/dashboard')

    return (
        <>
            <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-auto min-h-full pb-8 lg:pb-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 auth-bg"></div>
                </div>
                <div className="pt-20 md:pt-0 lg:px-8">
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
                            <h1 className="text-2xl font-semibold tracking-tight">Login To Application</h1>
                            <p className="text-sm text-muted-foreground">Enter the email and password below</p>
                        </div>

                        <LoginForm/>

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

                        <Link href={"/signup"}>
                            <Button variant="outline" className="w-full">
                                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                                Create a new account
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}