'use client'

import { ColumnDef } from "@tanstack/table-core"

export type Ticket = {
    id: string
    author: string
    title: string
    lastUpdate: string
    status: 'pending' | 'closed'
}

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'author',
        header: 'Author'
    },
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'lastUpdate',
        header: 'Last Update'
    },
]