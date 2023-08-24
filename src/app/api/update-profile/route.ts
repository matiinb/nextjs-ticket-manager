import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const firstName = String(formData.get('firstName'))
    const lastName = String(formData.get('lastName'))
    const isPublic = Boolean(formData.get('public'))
    const { userData } = await AuthUser()

    if (firstName == '' || lastName == '') {
        return NextResponse.json({error: 'ERROR_NO_DATA'}, {status: 400})
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED'}, {status: 401})
    }

    try {
        await prisma.user.update({
            data: {
                profile: {
                    update: {
                        firstName: firstName,
                        lastName: lastName,
                    }
                },
                public: isPublic
            },
            where: {
                email: userData!.email
            }
        })

        return NextResponse.redirect(
            `${requestUrl.origin}/dashboard`,
            { status: 301 }
        )
    } catch (error: any) {
        return NextResponse.json(
            {error: 'ERROR_FAILED_TO_UPDATE' + error},
            {status: 401}
        )
    }
}
