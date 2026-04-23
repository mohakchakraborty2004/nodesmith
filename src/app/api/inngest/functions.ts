import { NodeType } from "@/generated/prisma/enums";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { getExecutor } from "@/lib/executorFns";
import { topologicalSort } from "@/lib/topology-sort-util";
import { NonRetriableError } from "inngest";


export const ExecuteWorkflow = inngest.createFunction(
    { id : "Execute-Workflow", triggers : { event : "myapp/execute-workflow"} }, 
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

    //initializing context 
    let context = event.data.initialData || {}
    // for eg if we have google and stripe data , we use that data to run the workflows , no data for manual trigger

    for (const node of Sortworkflow) {
      const executor = getExecutor(node.type as NodeType)
      context = await executor({
        nodeId : node.id,
        context,
        step, 
        data : node.data as Record<string, unknown>
      })
    }

     return {
        workflowId,
        result : context
     }
 
    }
)