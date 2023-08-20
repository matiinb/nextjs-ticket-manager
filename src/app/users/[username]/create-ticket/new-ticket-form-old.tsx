// 'use client'
//
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
//
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useForm } from "react-hook-form";
// import { Textarea } from "@/components/ui/textarea";
// import { useSearchParams } from "next/navigation";
// import {useEffect, useState, useRef, SyntheticEvent} from "react";
// import AlertMessage from "@/components/alert-message";
// import { ExclamationTriangleIcon, FaceIcon } from "@radix-ui/react-icons";
//
// const formSchema = z.object({
//     title: z.string().min(5, {
//         message: "The title should be at least 5 characters.",
//     }),
//     text: z.string().min(10, {
//         message: "The text should be at least 10 characters.",
//     })
// })
//
// export function ProfileForm({ destUsername }: { destUsername: string }) {
//     const [error, setError] = useState('')
//     const [message, setMessage] = useState('')
//     const titleRef = useRef<HTMLInputElement>(null)
//     const textRef = useRef<HTMLInputElement>(null)
//
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             title: "",
//             text: "",
//         },
//     })
//
//     function handleSubmit(e: SyntheticEvent) {
//         if (titleRef.current!.value.length < 5 || textRef.current!.value.length < 10) {
//             e.preventDefault()
//         }
//     }
//
//     const searchParams = useSearchParams()
//     useEffect(() => {
//         const paramsError = searchParams.get('error') || ''
//         const paramsStatus = searchParams.get('status') || ''
//
//         if (paramsError !== '') setError(paramsError)
//         if (paramsStatus !== '') setMessage(paramsStatus)
//     }, [])
//
//     return (
//         <>
//             {error && (
//                 <AlertMessage
//                     icon={<ExclamationTriangleIcon className="w-10 h-10" />}
//                     title="Error" message={error}/>
//             )}
//             {message && (
//                 <AlertMessage
//                     icon={<FaceIcon className="w-10 h-10" />}
//                     title="Success" message="Successfully created a Ticket"/>
//             )}
//
//             <Form {...form}>
//                 <form action="/api/create-ticket" method="post" onSubmit={handleSubmit} className="space-y-6">
//                     <input type="hidden" name="destUsername" value={destUsername}/>
//                     <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                             <FormItem className="space-y-1">
//                                 <FormLabel className="font-bold">
//                                     Title
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input ref={titleRef} placeholder="Service cancellation request" {...field} />
//                                 </FormControl>
//                                 <FormDescription>
//                                     Enter the title (make sure its brief and full of information)
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//
//                     <FormField
//                         control={form.control}
//                         name="text"
//                         render={({ field }) => (
//                             <FormItem className="space-y-1">
//                                 <FormLabel className="font-bold">Text</FormLabel>
//                                 <FormControl>
//                                     <Textarea
//                                         ref={textRef}
//                                         className="h-40"
//                                         placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
//                                         {...field} />
//                                 </FormControl>
//                                 <FormDescription>
//                                     Enter the text (explain your request / issue in full details)
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <Button type="submit">Submit</Button>
//                 </form>
//             </Form>
//         </>
//     )
// }
