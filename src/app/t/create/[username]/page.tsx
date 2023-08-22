import {ProfileForm} from "@/app/t/create/[username]/new-ticket-form";
import { prisma } from "@/db";
import ErrorPage from "@/components/error-page";
import AuthUser from "@/app/auth/auth-user";

export default async function Page({ params }: { params: { username: string }}) {
    const { userData } = await AuthUser()

    if (params.username === userData!.username) return <ErrorPage className="flex-1" error="You cannot send a ticket to yourself"/>

    const query = await prisma.user.count({
        where: { username: params.username, public: true }
    })

    if (query === 0) {
        return <ErrorPage className="flex-1" error="User either doesnt exist or isnt public"/>
    }

    return (
        <>
            <div className="relative flex flex-col flex-1 justify-center lg:flex-row-reverse">
                <div className="flex-1 hidden relative h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900"/>
                </div>
                <div className="flex-1 px-4 md:px-8 lg:px-14 pt-8 max-w-screen-md">
                    <ProfileForm destUsername={params.username}/>
                </div>
            </div>
        </>
    )
}
