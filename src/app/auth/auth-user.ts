import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {prisma} from "@/db";

export default async function AuthUser() {
    const supabase = createServerComponentClient({cookies})
    const { data: {user} } = await supabase.auth.getUser()
    let userData

    if (user) {
        userData = await prisma.user.findUniqueOrThrow({
            where: {
                email: user?.email
            }
        })
    }

    return { userData }
}