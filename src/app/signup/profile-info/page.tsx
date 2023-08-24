import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthUser from "@/app/auth/auth-user"
import { redirect } from "next/navigation"
import ProfileInfoForm from "./profile-info-form";

export default async function Signup() {
    const { userData } = await AuthUser()
    !userData && redirect('/login')

    // If the user already has a profile linked to their
    // account then don't view the page
    userData!.profile!.lastName != '' && redirect('/dashboard')

    return (
        <>
            <Link href={"/dashboard"}>
                <Button
                    variant="ghost"
                    className="absolute right-4 top-4 md:right-8 md:top-8"
                >
                    Dashboard
                </Button>
            </Link>

            <div className="mx-auto flex w-full flex-col justify-center align-middle space-y-6 sm:w-[350px]">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Almost there</h1>
                    <p className="text-sm text-muted-foreground">Take a minute to add details to your profile</p>
                </div>

                <ProfileInfoForm/>
            </div>
        </>
    )
}