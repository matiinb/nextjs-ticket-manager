import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const ticketID = String(formData.get('ticketID'))
    const redirectPath = String(formData.get('redirectPath'))
    const { userData } = await AuthUser()

    if (ticketID == '') {
        return NextResponse.json({error: 'ERROR_NO_DATA'}, {status: 400})
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED'}, {status: 401})
    }

    try {
        await prisma.ticket.delete({
            where: {
                id: ticketID,
                OR: [
                    {author: { email: userData!.email }},

                    // {public: true} makes it so that only public users that can manage
                    // tickets be able to delete tickets related to them.
                    {recipient: { email: userData!.email, public: true }}
                ]
            }
        })

        return NextResponse.redirect(
            `${requestUrl.origin}${redirectPath}`,
            { status: 301 }
        )
    } catch (error: any) {
        return NextResponse.json(
            {error: 'ERROR_' + error.toUpperCase},
            {status: 401}
        )
    }
}
