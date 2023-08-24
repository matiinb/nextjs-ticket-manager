import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import ErrorPage from "@/components/error-page";

async function getData(): Promise<any> {
    const { userData } = await AuthUser()

    if (userData!.public === false) return null

    const data = await prisma.ticket.findMany({
        where: {
            recipient: { email: userData!.email, public: true }
        },
        select: {
            id: true,
            author: { select: { username: true } },
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
            author: item.author.username,
            title: item.title,
            lastUpdate: `${date} at ${time}`,
            status: (!item.isClosed) ? 'Pending' : 'Closed'
        }
    })
}

export default async function TicketManager() {
    const data = await getData()

    if (data) {
        return (
            <div className="sm:container">
                <h1 className="text-3xl font-semibold">Tickets Manager</h1>
                <div className="mx-auto py-10">
                    <DataTable columns={columns} data={data}/>
                </div>
            </div>
        )
    } else {
        return <ErrorPage error="You need to be a public user in order to access this page"/>
    }
}