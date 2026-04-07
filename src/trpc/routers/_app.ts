import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx}) => {
        console.log(ctx.auth.user)
      return prisma.user.findUnique({
        where : {
            id : ctx.auth.user.id
        }
      });
    }),

  getWorkflows : protectedProcedure.query(({ctx}) => {
    return prisma.workflow.findMany()
  }) ,

  createWorkflow : protectedProcedure.mutation(async ({ctx}) => {
         
        await inngest.send({
        name: "myapp/event",
        data: { id: "task_001" },
      });
        return { "success" : true }
  }) ,

  testAi : protectedProcedure.mutation(async({ctx}) => {
   const res =  await inngest.send({
      name: "myapp/aievent",
    })

    return {
     success : true,
     text : res
  }
  })
});
 
// export type definition of API
export type AppRouter = typeof appRouter;