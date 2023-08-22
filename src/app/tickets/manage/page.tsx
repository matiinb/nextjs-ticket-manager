import { columns } from "./columns"
import { DataTable } from "./data-table"
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
            isClosed: true
        }
    });

    return data.map(item => {
        const date = item.updatedAt.toDateString()
        const time = item.updatedAt.toTimeString().slice(0, 8)

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
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data}/>
            </div>
        )
    } else {
        return <ErrorPage error="You need to be a public user in order to access this page"/>
    }
}