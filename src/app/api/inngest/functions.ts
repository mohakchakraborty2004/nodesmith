import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';


export const aiFunction = inngest.createFunction(
    { id : "Ai function", triggers : { event : "myapp/aievent"} }, 
    async ({event, step}) => {
        const result = await step.run("call-ai", async()=> {
            const { text } = await generateText({
                model: google('gemini-2.5-flash'),
                prompt: 'Write a vegetarian lasagna recipe for 4 people.',
                });

                return text
            })
        
        

        return { message: "AI function complete", result }
    }
)


export const myFunction = inngest.createFunction(
  { id: "My Function", retries: 2, triggers : {event : "myapp/event"} },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return { processed: true, id: event.data.id };
    });

    // await step.sleep("pause", "6s");

    // await step.run("create-workflow", async () => {
    //    await prisma.workflow.create({
    //       data: {
    //         name: "New Workflow",
    //       }
    //     });
    // })

    return { message: `Task ${event.data.id} complete`, result };
  }
);

