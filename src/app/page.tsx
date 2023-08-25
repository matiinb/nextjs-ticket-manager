// import { prisma } from "@/db";
import AuthUser from "@/app/auth/auth-user";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const { userData } = await AuthUser()
    !userData ? redirect('/login') : redirect('/dashboard')
}