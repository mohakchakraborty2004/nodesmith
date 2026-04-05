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
  createWorkflow : protectedProcedure.mutation(({ctx}) => {
        return prisma.workflow.create({
          data: {
            name: "New Workflow",
          }
        });
  })
});
 
// export type definition of API
export type AppRouter = typeof appRouter;