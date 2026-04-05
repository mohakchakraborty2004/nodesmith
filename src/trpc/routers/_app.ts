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
  
});
 
// export type definition of API
export type AppRouter = typeof appRouter;