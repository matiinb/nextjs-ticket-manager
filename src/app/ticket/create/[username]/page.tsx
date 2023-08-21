import {ProfileForm} from "@/app/ticket/create/[username]/new-ticket-form";

export default function Page({ params }: { params: { username: string }}) {
    return (
        <>
            <div className="relative flex flex-col flex-1 justify-center lg:flex-row-reverse">
                <div className="flex-1 hidden relative h-full flex-col p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900"/>
                </div>
                <div className="flex-1 p-14 max-w-screen-md">
                    <ProfileForm destUsername={params.username}/>
                </div>
            </div>
        </>
    )
}
