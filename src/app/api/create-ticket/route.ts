import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import { nanoid } from "nanoid"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const title = String(formData.get('title'))
    const text = String(formData.get('text'))
    const destUsername = String(formData.get('destUsername'))
    const { userData } = await AuthUser()

    if (title.length < 5 || text.length < 10 || destUsername == '') {
        return NextResponse.redirect(
            `${requestUrl.origin}/user/${destUsername}/create-ticket?error=Invalid input values`,
            { status: 301 }
        )
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED',}, {status: 401})
    }

    try {
        await prisma.ticket.create({
            data: {
                id: nanoid(12),
                title: title,
                author: {
                    connect: {username: userData.username}
                },
                recipient: {
                    connect: {username: destUsername}
                },
                replies: {
                    create: {
                        text: text,
                        author: {
                            connect: {username: destUsername}
                        }
                    }
                }
            }
        })

        return NextResponse.redirect(
            `${requestUrl.origin}/user/${destUsername}/create-ticket?status=success`,
            { status: 301 }
        )
    } catch (error) {
        return NextResponse.redirect(
            `${requestUrl.origin}/user/${destUsername}/create-ticket?error=${error}`,
            { status: 301 }
        )
    }
}
