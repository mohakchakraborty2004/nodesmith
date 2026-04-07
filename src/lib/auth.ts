import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import polarClient from "./polar";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword : {
        enabled: true,
        autoSignIn : true
    }, 
    plugins : [
        polar({
            client : polarClient,
            createCustomerOnSignUp : true,
            use : [
                checkout({
                    products : [
                        {
                            productId : "5b456f38-6ebe-48f6-9bc2-510423a125f7",
                            slug : "nodesmith-pro"
                        }
                    ], 
                    successUrl : process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly : true
                }), 
                portal()
            ]
        })
    ]
});