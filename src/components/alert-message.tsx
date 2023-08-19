// import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {ReactNode} from "react";

export default function AlertMessage({ icon, title, message }: { icon: ReactNode, title: string, message: string}) {
    return (
        <Alert className="flex flex-row gap-4 items-center">
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