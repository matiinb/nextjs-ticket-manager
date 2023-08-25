import { NextResponse } from 'next/server'
import { prisma } from "@/db"
import AuthUser from "@/app/auth/auth-user"
import {redirect} from "next/navigation";
import {param} from "ts-interface-checker";

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const { userData } = await AuthUser()
    const formData = await request.formData()

    // If the submitted form doesn't contain one of the fields, then use the data from the user profile instead
    const firstName = formData.get('firstName') == null ? userData!.profile!.firstName : String(formData.get('firstName'))
    const lastName = formData.get('lastName') == null ? userData!.profile!.lastName : String(formData.get('lastName'))
    const isPublic = formData.get('public') == null ? userData!.public : Boolean(formData.get('public'))

    const redirectPath = String(formData.get('redirectPath'))

    if (firstName == '' || lastName == '') {
        return NextResponse.json({error: 'ERROR_NO_DATA'}, {status: 400})
    }

    if (!userData) {
        return NextResponse.json({error: 'ERROR_USER_UNAUTHORIZED'}, {status: 401})
    }

    try {
        await prisma.user.update({
            data: {
                profile: { update: { firstName: firstName, lastName: lastName } },
                public: isPublic
            },
            where: { email: userData!.email }
        })

        // If the redirect path is the Settings page then
        // set status to true so the page shows a message
        // about successful profile update
        const params = (redirectPath == '/settings' || redirectPath == '/settings/account') ? '?status=success' : ''

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
