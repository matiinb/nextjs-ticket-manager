import React from "react";

export default function Page({ params }: { params: { username: string }}) {
    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <span>{params.username}</span>
        </>
    )
}