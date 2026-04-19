import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { topologicalSort } from "@/lib/topology-sort-util";
import { NonRetriableError } from "inngest";


export const ExecuteWorkflow = inngest.createFunction(
    { id : "Execute-Workflow", triggers : { event : "myapp/execute-workflow"}, retries : 3 }, 
    async ({event, step}) => {
      const workflowId = event.data.id

      if(!workflowId) {
        throw new NonRetriableError("Workflow ID is required");
      }

      const Sortworkflow = await step.run("Sort Workflow", async () => {    
        const workflow = await prisma.workflow.findUniqueOrThrow({
        where : {
          id : workflowId
        },
        include : {
          nodes : true,
          connections : true
        }
      }) 

      const sortedNodes = topologicalSort(workflow.nodes, workflow.connections);

      return sortedNodes
    }) 

     return Sortworkflow
 
    }
)