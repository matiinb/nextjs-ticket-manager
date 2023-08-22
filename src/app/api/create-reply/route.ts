import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const text = String(formData.get('text'))
    const ticketID = String(formData.get('ticketID'))
    const { userData } = await AuthUser()

    if (text.length < 2 || ticketID == '') {
        return NextResponse.redirect(
            `${requestUrl.origin}/ticket/reply/${ticketID}?error=Invalid input values`,
            { status: 301 }
        )
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED',}, {status: 401})
    }

    try {
        await prisma.reply.create({
            data: {
                text: text,
                author: { connect: { email: userData.email } },
                relatedTicket: { connect: { id: ticketID, isClosed: false } }
            }
        })

        return NextResponse.redirect(
            `${requestUrl.origin}/ticket/view/${ticketID}`,
            { status: 301 }
        )
    } catch (error) {
        return NextResponse.redirect(
            `${requestUrl.origin}/ticket/reply/${ticketID}?error=${error}`,
            { status: 301 }
        )
    }
}
