import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const ticketID = String(formData.get('ticketID'))
    const { userData } = await AuthUser()

    if (ticketID == '') {
        return NextResponse.json({error: 'ERROR_NO_DATA'}, {status: 400})
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED'}, {status: 401})
    }

    try {
        await prisma.ticket.update({
            data: { isClosed: true },
            where: {
                id: ticketID,
                isClosed: false,

                // Only allow the user to close the ticket if they are the
                // one receiving the ticket (managing the ticket)
                recipient: { email: userData!.email, public: true }
            }
        })

        return NextResponse.redirect(
            `${requestUrl.origin}/tickets/manage`,
            { status: 301 }
        )
    } catch (error: any) {
        return NextResponse.json(
            {error: 'ERROR_FAILED_TO_UPDATE'},
            {status: 401}
        )
    }
}
