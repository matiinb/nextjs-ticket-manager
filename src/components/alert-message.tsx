'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

export default function AlertMessage({ icon, title, message, className }: { icon: ReactNode, title: string, message: string, className?: string}) {
    return (
        <Alert className={`flex flex-row gap-4 items-center ` + className}>
            <div>
                { icon }
            </div>
            <div>
                <AlertTitle className="text-lg font-semibold">{title!}</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                    { message! }
                </AlertDescription>
            </div>
        </Alert>
    )
}