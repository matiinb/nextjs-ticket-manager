'use client'

import { ColumnDef } from "@tanstack/table-core"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowTopRightIcon, DotsHorizontalIcon, ResetIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export type Ticket = {
    id: string
    recipient: string
    title: string
    lastUpdate: string
    status: 'Pending' | 'Closed'
}

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'recipient',
        header: 'Recipient'
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'lastUpdate',
        header: 'Last Update'
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const ticket = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <Link href={`/t/view/${ticket.id}`}>
                            <DropdownMenuItem>
                                <ArrowTopRightIcon className="h-4 w-4 mr-2"/>
                                View
                            </DropdownMenuItem>
                        </Link>

                        {(ticket.status == 'Pending') && (
                            <Link href={`/t/reply/${ticket.id}`}>
                                <DropdownMenuItem>
                                    <ResetIcon className="h-4 w-4 mr-2"/>
                                    Reply
                                </DropdownMenuItem>
                            </Link> )}

                        <DropdownMenuSeparator />
                        <form action="/api/delete-ticket" method="post">
                            <input name="ticketID" type="hidden" value={ticket.id}/>
                            <input name="redirectPath" type="hidden" value="/tickets/list"/>
                            <DropdownMenuItem>
                                <button type="submit" className="text-red-600 flex items-center w-full">
                                    <TrashIcon className="h-4 w-4 mr-2"/>
                                    Delete
                                </button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]