import {ProfileForm} from "@/app/users/[username]/create-ticket/new-ticket-form";

export default function Page({ params }: { params: { username: string }}) {
    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight">
                Send a ticket to {params.username}
            </h1>

            <div className="max-w-full sm:max-w-lg mt-5">
                <ProfileForm destUsername={params.username}/>
            </div>
        </>
    )
}
