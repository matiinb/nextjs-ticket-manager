import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import ErrorPage from "@/components/error-page";
import {Metadata} from "next";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Ticket List - Ticket Manager',
    description: 'A Web Application created using NextJS',
}

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
            isClosed: true,
            replies: { select: { createdAt: true }, orderBy: [{ createdAt: 'desc' }] }
        },
        orderBy: [{
            updatedAt: 'desc'
        }]
    });

    // Sort the tickets based on the date of their latest corresponding reply
    const sortedData = data.sort((a: any, b: any) => {
        return (b.replies[0].createdAt - a.replies[0].createdAt)
    })

    return sortedData.map(item => {
        const updatedAt = item.replies[0].createdAt
        const date = updatedAt.toDateString()
        const time = updatedAt.toTimeString().slice(0, 8)

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