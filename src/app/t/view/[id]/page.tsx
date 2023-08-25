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
import {LockClosedIcon, Pencil2Icon} from "@radix-ui/react-icons";
import LinkButton from "@/components/link-button";
import AlertMessage from "@/components/alert-message";

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
        include: { author: true, relatedTicket: true },
        orderBy: { createdAt: 'asc' }
    })

    if (!query || query.length === 0) {
        return <ErrorPage className="flex-1" error="Either the ticket doesnt exist, or you don't have access to it"/>
    }

    return (
        <>
            <div className="container my-8 max-w-xl ">
                <h1 className="text-3xl font-semibold mb-8">{`Ticket: '${query[0].relatedTicket.title}'`}</h1>

                {
                    // If the ticket related to the first reply is closed,
                    // then show an error
                    (query[0].relatedTicket.isClosed) && (<AlertMessage
                        title="Ticket is closed"
                        message="This ticket has been closed by the recipient. Please create a new ticket if you think this happened by mistake."
                        icon={<LockClosedIcon className="w-10 h-10"/>}
                        className="mb-6"
                    />)
                }

                <div>
                {
                    query.map((item, index) => {
                        const timeHour = item.createdAt.getHours()
                        const rawMinute = item.createdAt.getMinutes()
                        const timeMinute = (rawMinute >= 10) ? rawMinute : `0${rawMinute}`
                        const author = (item.author.username == userData!.username) ? "You" : item.author.username
                        const cardColor = (item.author.username != userData!.username) ? "bg-zinc-100" : ""

                        return (
                            <Card className={`mb-4 ${cardColor}`} key={index}>
                                <CardHeader>
                                    <CardTitle>{author}</CardTitle>
                                    <CardDescription>{`${timeHour}:${timeMinute}`}</CardDescription>
                                </CardHeader>
                                <CardContent className="break-words">
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

                {
                    // Only render the Reply button if the ticket
                    // related to the first reply is still open
                    (!query[0].relatedTicket.isClosed) && (
                    <LinkButton
                        href={`/t/reply/${params.id}`}
                        className="w-full h-12"
                        variant="default"
                    >
                        <Pencil2Icon className="w-4 h-4 mr-2"/>
                        Add a reply
                    </LinkButton>)
                }
            </div>
        </>
    )
}
