import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import ErrorPage from "@/components/error-page";

async function getData(): Promise<any> {
    const { userData } = await AuthUser()

    const data = await prisma.ticket.findMany({
        where: {
            author: { email: userData!.email },
            recipient: { public: true }
        },
        select: {
            id: true,
            recipient: { select: { username: true } },
            title: true,
            updatedAt: true,
            isClosed: true
        },
        orderBy: [
            {
                updatedAt: 'desc'
            }
        ]
    });

    return data.map(item => {
        const date = item.updatedAt.toDateString()
        const time = item.updatedAt.toTimeString().slice(0, 8)

        return {
            id: item.id,
            recipient: item.recipient.username,
            title: item.title,
            lastUpdate: `${date} at ${time}`,
            status: (!item.isClosed) ? 'Pending' : 'Closed'
        }
    })
}

export default async function TicketList() {
    const data = await getData()

    if (data) {
        return (
            <div className="sm:container">
                <h1 className="text-3xl font-semibold">Tickets</h1>
                <div className="mx-auto py-10">
                    <DataTable columns={columns} data={data}/>
                </div>
            </div>
        )
    } else {
        return <ErrorPage error="An error occurred. Please try again"/>
    }
}