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
import Link from "next/link";


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
            callbackURL : "/workflows"
        }, {
            onSuccess : () => {
                router.push('/workflows')
            } ,
            onError(context) {
                toast(context.error.message)
            },
        })
    }}

    const isPending = form.formState.isSubmitting;
    
    return (    
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
            {/* Geometric Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-zinc-300/30 dark:border-zinc-700/30" />
                <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full border border-zinc-300/20 dark:border-zinc-700/20" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full border border-zinc-300/30 dark:border-zinc-700/30" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full border border-zinc-300/20 dark:border-zinc-700/20" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                
                {/* Floating shapes */}
                <div className="absolute top-1/4 right-1/4 w-16 h-16 rotate-45 border border-primary/20 animate-pulse" />
                <div className="absolute bottom-1/3 left-1/5 w-12 h-12 rotate-12 border border-primary/15 rounded-lg animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-primary/5 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rotate-[30deg] border-2 border-dashed border-zinc-300/40 dark:border-zinc-600/40 rounded-xl" />
            </div>

            <Card className="w-full max-w-md shadow-2xl border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 relative z-10 animate-fade-in">
                
                <CardHeader className="space-y-1 text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-2xl font-black text-primary">N</span>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400">
                        Enter your credentials to access your workflows
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-4">

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
                                                placeholder="you@example.com"
                                                className="h-11"
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
                                                placeholder="••••••••"
                                                className="h-11"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-11 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                disabled={isPending}
                            >
                                {isPending ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full h-11 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </Button>

                        <Button variant="outline" className="w-full h-11 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </Button>
                    </div>

                </CardContent>

                <CardFooter className="flex justify-center pb-6">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-primary font-medium hover:underline transition-all">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}