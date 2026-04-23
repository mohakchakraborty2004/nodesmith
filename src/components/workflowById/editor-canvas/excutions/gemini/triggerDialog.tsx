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

const AVAILABLE_MODELS = [
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-pro"
]

const schema = z.object({
    variable : z.string().min(1, {message : "Variable name is required"}).regex(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/, {message : "Invalid variable name. It should start with a letter, underscore, or dollar sign, and can only contain letters, numbers, underscores, or dollar signs."}),
    model : z.enum(AVAILABLE_MODELS, {message : "Model is required"}),
    systemPrompt : z.string().optional(),
    userPrompt : z.string().min(1, {message : "User prompt is required"}),
    apiKey : z.string().min(1, {message : "API key is required"})
})

export type GeminiFormType = z.infer<typeof schema>


type Props = {
    open : boolean,
    onOpenChange : (open : boolean) => void;
    onSubmit : (values : z.infer<typeof schema>) => void;
    defaultModel ? : "gemini-1.5-pro" | "gemini-1.0-pro" | "gemini-1.5-flash" | "gemini-1.5-flash-8b" | "gemini-pro";
    defaultSystemPrompt ? : string;
    defaultUserPrompt ? : string;
    defaultVariable ? : string;
    defaultApiKey ? : string;
}


export default function GeminiDialog ({
    open,
    onOpenChange, 
    onSubmit,
    defaultModel,
    defaultSystemPrompt,
    defaultUserPrompt,
    defaultVariable,
    defaultApiKey
}: Props ){

    useEffect(() => {
        if(open) {
            form.reset({
                model : defaultModel ?? "gemini-1.5-pro",
                systemPrompt : defaultSystemPrompt ?? "",
                userPrompt : defaultUserPrompt ?? "",
                variable : defaultVariable ?? "",
                apiKey : defaultApiKey ?? ""
            })
        }
    }, [open, defaultModel, defaultSystemPrompt, defaultUserPrompt, defaultVariable, defaultApiKey])
    const form = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues : {
            model : defaultModel ?? "gemini-1.5-pro",
            systemPrompt : defaultSystemPrompt ?? "",
            userPrompt : defaultUserPrompt ?? "",
            variable : defaultVariable ?? "",
            apiKey : defaultApiKey ?? ""
        }
    })


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
                            Gemini Execution Node
                        </DialogTitle>
                        <DialogDescription>
                            Configure the Gemini execution node to interact with the Gemini models as part of your workflow. You can specify the model, system prompt, user prompt, and other relevant settings to customize the behavior of the node according to your requirements.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="systemPrompt"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>System Prompt (optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='You are a helpful assistant...' {...field}></Textarea>
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
                                            <Input placeholder="myGeminiTrigger" {...field}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                        <FormDescription></FormDescription>
                                    </FormItem>
                                )}
                            ></FormField>

                             <FormField 
                                control={form.control}
                                name="apiKey"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>API key</FormLabel>
                                        <FormControl>
                                            <Input placeholder="AIxyajhadb....3dha" {...field}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                        <FormDescription></FormDescription>
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="model"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Model"></SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {AVAILABLE_MODELS.map((model) => (
                                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>

                                <FormField
                                    control={form.control}
                                    name="userPrompt"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>User Prompt</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='Summarize the content...' {...field}></Textarea>
                                            </FormControl>
                                            <FormDescription>
                                                Provide the user prompt. You can use Handlebars syntax to include dynamic values from the execution context, such as {'${{json myApiName.httpResponse.data }}'} or {'${{gemini myGeminiNode.GeminiResponse}}'}
                                            </FormDescription>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                />
                 
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