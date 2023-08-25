import CreateTicket from "./cards/create-ticket";
import ProfileSettings from "./cards/profile-settings";
import AccountSettings from "./cards/account-settings";
import TicketManagerStats from "./cards/ticket-manager-stats";
import TicketListStats from "./cards/ticket-list-stats";
import AuthUser from "@/app/auth/auth-user";
import { prisma } from "@/db";

export const dynamic = 'force-dynamic'

function CardContainer({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={ "flex items-center justify-center [&>div]:w-full " + className }
            {...props}
        />
    )
}

export default async function Dashboard() {
    const { userData } = await AuthUser()

    const query = await prisma.user.findUnique({
        where: { email: userData!.email },
        select: {
            _count: {
                select: { authoredTickets: true, receivedTickets: true }
            }
        }
    })

    return (
        <>
            <h1 className="text-3xl">Dashboard</h1>

            <div className="items-start justify-center gap-6 rounded-lg py-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <CardContainer>
                        <TicketManagerStats ticketsCount={query!._count.receivedTickets}/>
                    </CardContainer>

                    <CardContainer>
                        <TicketListStats ticketsCount={query!._count.authoredTickets}/>
                    </CardContainer>
                </div>

                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <CardContainer>
                        <ProfileSettings/>
                    </CardContainer>

                    <CardContainer>
                        <AccountSettings/>
                    </CardContainer>
                </div>

                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <CardContainer>
                        <CreateTicket/>
                    </CardContainer>
                </div>
            </div>
        </>
    )
}