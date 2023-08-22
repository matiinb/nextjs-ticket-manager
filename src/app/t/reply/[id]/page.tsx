import ReplyForm from "./new-reply-form";
import { prisma } from "@/db";
import ErrorPage from "@/components/error-page";
import AuthUser from "@/app/auth/auth-user";

export default async function Page({ params }: { params: { id: string }}) {
    const { userData } = await AuthUser()

    const query = await prisma.ticket.findUnique({
        where: {
            id: params.id,
            OR: [
                {
                    author: { email: userData!.email }
                },
                {
                    recipient: { email: userData!.email }
                }
            ],
            recipient: { public: true }
        }
    })

    if (!query) {
        return <ErrorPage className="flex-1" error="Either the ticket doesnt exist or you don't have access to it"/>
    }

    return (
        <>
            <div className="relative flex flex-col flex-1 justify-center lg:flex-row-reverse">
                <div className="flex-1 hidden relative h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900"/>
                </div>
                <div className="flex-1 px-4 md:px-8 lg:px-14 pt-8 max-w-screen-md">
                    <ReplyForm ticketID={params.id} ticketTitle={query.title}/>
                </div>
            </div>
        </>
    )
}
