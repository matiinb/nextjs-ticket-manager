'use client'

export default function ErrorPage({ className, error }: { className: string, error: string }) {
    return (
        <div className={`flex md:items-center md:justify-center px-8 mt-8 md:mt-0 ${className}`}>
            <h1 className="text-3xl font-light text-muted-foreground">{error}</h1>
        </div>
    )
}