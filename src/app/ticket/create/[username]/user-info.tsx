import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";

export default function UserInfo({ destUsername }: { destUsername: string }) {
    return (
        <>
            <div className="mt-6 text-white flex flex-col flex-1 justify-between">
                <div>
                    <span className="text-small mb-4">About {destUsername}:</span>

                    <div className="flex space-x-4">
                        <Avatar className="h-14 w-14 text-zinc-700">
                            <AvatarFallback className="bg-zinc-300">
                                <PersonIcon className="h-8 w-8"/>
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-3xl font-medium">Matin Biabanpour</span>
                    </div>
                </div>
                <div className="max-w-lg mt-3 pt-8">
                    <span className="text-2xl font-light leading-10">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ipsum laborum optio, quo totam voluptates!
                    </span>
                </div>
            </div>
        </>
    )
}