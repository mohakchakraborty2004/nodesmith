import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";

export const myFunction = inngest.createFunction(
  { id: "My Function", retries: 2, triggers : {event : "myapp/event"} },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    await step.sleep("pause", "6s");

    await step.run("create-workflow", async () => {
       await prisma.workflow.create({
          data: {
            name: "New Workflow",
          }
        });
    })

    return { message: `Task ${event.data.id} complete`, result };
  }
);