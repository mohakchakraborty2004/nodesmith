"use client";

import {useForm} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import {
    Card, 
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/client-auth";
import { GitGraph, Mail } from "lucide-react"


const LoginFormSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver : zodResolver(LoginFormSchema),
        defaultValues : {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: LoginFormValues) => {{
         await authClient.signIn.email({
            password : values.password,
            email : values.email,
            callbackURL : "/"
        }, {
            onSuccess : () => {
                router.push('/dashboard')
            } ,
            onError(context) {
                toast(context.error.message)
            },
        })
    }}

    const isPending = form.formState.isSubmitting;
    
    return (    
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-xl">
                
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-semibold">
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="mohak@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                            <Mail className="mr-2 h-4 w-4" />
                            Google
                        </Button>

                        <Button variant="outline" className="w-full">
                            <GitGraph className="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}