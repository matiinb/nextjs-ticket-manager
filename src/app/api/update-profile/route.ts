import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import {redirect} from "next/navigation";
import {param} from "ts-interface-checker";

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const firstName = String(formData.get('firstName'))
    const lastName = String(formData.get('lastName'))
    const isPublic = Boolean(formData.get('public')) || null
    const redirectPath = String(formData.get('redirectPath'))
    const { userData } = await AuthUser()

    if (firstName == '' || lastName == '') {
        return NextResponse.json({error: 'ERROR_NO_DATA'}, {status: 400})
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED'}, {status: 401})
    }

    try {

        // If the form includes the isPublic value then update it in DB
        // otherwise just update the first and last name
        (isPublic) ? await prisma.user.update({
            data: {
                profile: { update: {
                    firstName: firstName,
                    lastName: lastName,
                } },
                public: isPublic
            },
            where: { email: userData!.email }
        }) : await prisma.user.update({
            data: {
                profile: { update: {
                    firstName: firstName,
                    lastName: lastName,
                } },
            },
            where: { email: userData!.email }
        })

        // If the redirect path is the Settings page then
        // set status to true so the page shows a message
        // about successful profile update
        const params = (redirectPath == '/settings') && '?status=success'

        return NextResponse.redirect(
            `${requestUrl.origin}${redirectPath}${params}`,
            { status: 301 }
        )
    } catch (error: any) {
        return NextResponse.json(
            {error: 'ERROR_FAILED_TO_UPDATE' + error},
            {status: 401}
        )
    }
}
