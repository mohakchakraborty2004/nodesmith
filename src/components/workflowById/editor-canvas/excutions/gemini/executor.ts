import { NodeExecutor } from "@/lib/types-executor-Fns"
import { NonRetriableError } from "inngest";
import Handlebars from "handlebars"
import { generateText } from 'ai';
import { createGoogleGenerativeAI} from '@ai-sdk/google';

type GeminiExecutionData = {
    model : "gemini-2.5-flash" | "gemini-2.0-flash" ;
    userPrompt : string;
    systemPrompt : string;
    variable : string;
    apiKey : string;
    [key : string] : unknown;
}


Handlebars.registerHelper("gemini", function(context) {
    const stringify = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(stringify);
    return safeString;
});

export const GeminiTriggerExecutor : NodeExecutor<GeminiExecutionData> = async({
    nodeId,
    context,
    step, 
    data
}) => {

    console.log("Executing Gemini Node with data : ", data);
    // add a loading publish state 
    if(!data.model) {
        // add a failed status here later
        throw new NonRetriableError("Model not available for execution");
    }

    if(!data.variable){
        // add a failed status here later
        throw new NonRetriableError("Variable name not provided for storing response");
    }

    if(!data.apiKey){
        // add a failed status here later
        throw new NonRetriableError("API key not provided for Gemini execution");
    }

    const result = await step.run("gemini-trigger", async() => {

        const ai = createGoogleGenerativeAI({
            apiKey : data.apiKey
        })

                const { text } = await generateText({
                model: ai(data.model),
                prompt: Handlebars.compile(data.userPrompt)(context),
                system: data.systemPrompt ? Handlebars.compile(data.systemPrompt)(context) : "You are a helpful assistant that provides accurate and concise answers based on the user's prompt. Always ensure that your responses are relevant to the user's query and provide clear information."
                });

                console.log(text);

            return {
                ...context,
                [data.variable] : {
                    GeminiResponse : text
                }
            }
        
    }) 

    // add a completed success status here later 

    return result;
}