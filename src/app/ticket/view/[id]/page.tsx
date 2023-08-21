import { prisma } from "@/db";
import ErrorPage from "@/components/error-page";
import AuthUser from "@/app/auth/auth-user";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function Page({ params }: { params: { id: string }}) {
    const { userData } = await AuthUser()

    const query = await prisma.reply.findMany({
        where: {
            relatedTicket: {
                id: params.id,
                OR: [
                    {
                        author: {
                            email: userData!.email
                        }
                    },
                    {
                        recipient: {
                            email: userData!.email
                        }
                    }
                ],

                recipient: { public: true }
            }
        },
        include: { author: true, relatedTicket: true }
    })

    if (!query || query.length === 0) {
        return <ErrorPage className="flex-1" error="Either the ticket doesnt exist, or you don't have access to it"/>
    }

    return (
        <>
            <div className="container mt-8">
                <h1 className="text-3xl mb-8">{query[0].relatedTicket.title}</h1>

                {
                    query.map(item => {
                        const timeHour = item.createdAt.getHours()
                        const rawMinute = item.createdAt.getMinutes()
                        const timeMinute = (rawMinute > 10) ? rawMinute : `0${rawMinute}`

                        return (
                            <Card className="max-w-sm mb-4">
                                <CardHeader>
                                    <CardTitle>{item.author.username}</CardTitle>
                                    <CardDescription>{`${timeHour}:${timeMinute}`}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.text}</p>
                                </CardContent>
                                {/*<CardFooter>*/}
                                {/*    <p>Card Footer</p>*/}
                                {/*</CardFooter>*/}
                            </Card>
                        )
                    })
                }

            </div>
        </>
    )
}
