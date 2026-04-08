import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { Search } from "lucide-react";
import z from "zod";


export const workflowRouter = createTRPCRouter({
    createWorkflow : protectedProcedure.mutation(async ({ctx}) => {
        await prisma.workflow.create({
            data : {
                name : "lorem",
                userId : ctx.auth.user.id
            }
        })

        return {
            success : "true", 
            message : "workflow created"
        }
    }), 

    deleteWorkflow : protectedProcedure.input(z.object({
        id : z.string()
    })).mutation(async({ctx, input})=> {
        await prisma.workflow.delete({
            where : {
                id : input.id,
                userId : ctx.auth.user.id
            }
        })

        return {
            success : true, 
            message : "workflow deleted"
        }
    }), 

    updateWorkflow : protectedProcedure.input(z.object({
        id : z.string(), 
        name : z.string().min(3)
    })).mutation(async({ctx, input}) => {
        await prisma.workflow.update({
            where : {
                id : input.id,
                userId : ctx.auth.user.id
            }, 
            data : {
                name : input.name
            }
        })

         return {
            success : true, 
            message : "workflow name updated"
        }

    }),

    getWorkflows : protectedProcedure
    .input(z.object({
       search : z.string().optional()
    }))
    .query(async({ctx})=> {
        const data = await prisma.workflow.findMany({
            where : {
                userId : ctx.auth.user.id
            }
        })

        return {
            success : true, 
            data : data || []
        }
    })
})