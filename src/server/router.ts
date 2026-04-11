import { NodeType } from "@/generated/prisma/enums";
import { pagination } from "@/lib/constants";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { Search } from "lucide-react";
import z from "zod";


export const workflowRouter = createTRPCRouter({
    createWorkflow : protectedProcedure.mutation(async ({ctx}) => {
        await prisma.workflow.create({
            data : {
                name : "lorem-ipsum",
                userId : ctx.auth.user.id,
                nodes : {
                    create : {
                        type : NodeType.INITIAL,
                        position : {x : 0 , y : 0},
                        name : NodeType.INITIAL
                    }
                }
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
      const data =  await prisma.workflow.update({
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
            message : "workflow name updated",
            data 
        }

    }),

    getWorkflows : protectedProcedure
    .input(z.object({
        page : z.number().default(pagination.DEFAULT_PAGE),
        pageSize : z
        .number()
        .min(pagination.MIN_PAGE_SIZE)
        .max(pagination.MAX_PAGE_SIZE)
        .default(pagination.DEFAULT_PAGE_SIZE),
        search : z.string().default("")
    }))
    .query(async({ctx, input})=> {

        const data = await prisma.workflow.findMany({
            skip : (input.page - 1) * input.pageSize,
            take : input.pageSize,
            where : {
                userId : ctx.auth.user.id, 
                name : {
                    contains : input.search,
                    mode : "insensitive"
                }
            }, 
            orderBy : {
                createdAt : "desc"
            }
        })

        if(!data) {
            return {
                success : false,
                data : [],
                totalPages : 0,
                totalCount : 0,
                hasNextPage : false,
                hasPrevPage : false
            }
        }

        const totalCount = await prisma.workflow.count({
            where : {
                userId : ctx.auth.user.id, 
                name : {
                    contains : input.search,
                    mode : "insensitive"
                }
            }, 
        })

        const totalPages = Math.ceil(totalCount / input.pageSize)
        const hasNextPage = input.page < totalPages
        const hasPrevPage = input.page > 1


        return {
            success : true, 
            data,
            totalPages,
            totalCount, 
            hasNextPage,
            hasPrevPage
        }
    }),

    getWorkflowById : protectedProcedure
    .input(z.object({
        id : z.string()
    }))
    .query(async({ctx, input}) => {
        const data = await prisma.workflow.findUniqueOrThrow({
            where : {
                id : input.id,
                userId : ctx.auth.user.id
            },
            include : {
                nodes : true
            }
        })

        return {
            data ,
            msg : "Data found"
        }
    })
})