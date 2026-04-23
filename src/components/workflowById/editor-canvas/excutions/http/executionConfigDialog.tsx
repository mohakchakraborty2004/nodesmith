"use client"

import {
Dialog,
DialogContent,
DialogHeader, 
DialogDescription,
DialogTitle,
DialogFooter
} from "@/components/ui/dialog"
import z from "zod";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
FormDescription
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
 } from "@/components/ui/select"
 import { Input } from "@/components/ui/input"
 import { Button } from "@/components/ui/button"
 import { Textarea } from "@/components/ui/textarea";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
import { useEffect } from "react";


const schema = z.object({
    variable : z.string().min(1, {message : "Variable name is required"}).regex(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/, {message : "Invalid variable name. It should start with a letter, underscore, or dollar sign, and can only contain letters, numbers, underscores, or dollar signs."}),
    endpoint : z.string({message : "Endpoint is required"}).url({message : "Invalid URL"}),
      method : z.enum(["GET" , "POST" , "PUT" , "DELETE" , "PATCH"]),
        body : z.string().optional()
        //.refine()
})

export type FormType = z.infer<typeof schema>


type Props = {
    open : boolean,
    onOpenChange : (open : boolean) => void;
    onSubmit : (values : z.infer<typeof schema>) => void;
    defaultEndpoint ? : string;
    defaultMethod ? : "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    defaultBody ? : string;
    defaultVariable ? : string;
}


export default function HttpDialog ({
    open,
    onOpenChange, 
    onSubmit,
    defaultEndpoint,
    defaultMethod,
    defaultBody,
    defaultVariable
}: Props ){

    useEffect(() => {
        if(open) {
            form.reset({
                endpoint : defaultEndpoint ?? "",
                method : defaultMethod ?? "GET",
                body : defaultBody ?? "",
                variable : defaultVariable ?? ""
            })
        }
    }, [open, defaultEndpoint, defaultMethod, defaultBody, defaultVariable])

    const form = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues : {
            endpoint : defaultEndpoint ?? "",
            method : defaultMethod ?? "GET",
            body : defaultBody ?? "{}",
            variable : defaultVariable ?? ""
        }
    })

    const watchMethod = form.watch("method")
    const showBodyFields = ["POST" , "PUT" , "PATCH"].includes(watchMethod);

    const handleSubmit = (values : z.infer<typeof schema>) => {
        onSubmit(values)
        onOpenChange(false)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            HTTP Execution Node
                        </DialogTitle>
                        <DialogDescription>
                            Configure the HTTP execution node to make HTTP requests to external APIs or services as part of your workflow. You can specify the endpoint, HTTP method, request body, and other relevant settings to customize the behavior of the node according to your requirements.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="endpoint"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Endpoint</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://api.example.com/data/{{httpResponse.data.id}}" {...field}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField 
                                control={form.control}
                                name="variable"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Variable</FormLabel>
                                        <FormControl>
                                            <Input placeholder="{{httpResponse.data.id}} / {{googleForm.responses[`your question`]}}" {...field}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                        <FormDescription></FormDescription>
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="method"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>HTTP Method</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select HTTP Method"></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="GET">GET</SelectItem>
                                                    <SelectItem value="POST">POST</SelectItem>
                                                    <SelectItem value="PUT">PUT</SelectItem>
                                                    <SelectItem value="DELETE">DELETE</SelectItem>
                                                    <SelectItem value="PATCH">PATCH</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>

                            { showBodyFields && (
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Request Body</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='{"key": "value"}' {...field}></Textarea>
                                            </FormControl>
                                            <FormDescription>
                                                Provide the request body in JSON format. You can use Handlebars syntax to include dynamic values from the execution context, such as {'${{json myApiName.httpResponse.data }}'}
                                            </FormDescription>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                />
                 
                            )}
                    <DialogFooter>
                        <Button onClick={() => onOpenChange(false)} variant="outline" className="hover:cursor-pointer">Cancel</Button>
                        <Button type="submit" className="hover:cursor-pointer hover:bg-white hover:text-black transition-all border-gray-300">Save</Button>
                    </DialogFooter>
                        </form>
                    </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}