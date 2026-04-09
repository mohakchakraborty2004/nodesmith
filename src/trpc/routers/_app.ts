import { createTRPCRouter} from '../init';

import { workflowRouter } from '@/server/router';

export const appRouter = createTRPCRouter({
  // actual routes => 

  workflow : workflowRouter
});
 
// export type definition of API
export type AppRouter = typeof appRouter;