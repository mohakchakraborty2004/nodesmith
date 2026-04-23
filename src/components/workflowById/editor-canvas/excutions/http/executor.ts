import { NodeExecutor } from "@/lib/types-executor-Fns"
import { NonRetriableError } from "inngest";
import axios, { Method } from "axios"
import Handlebars from "handlebars"

type HTTPExecutionData = {
    endpoint : string,
    method  : string | any
    body ?: string
    variable  : string
}

Handlebars.registerHelper("json", function(context) {
    const stringify = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(stringify);
    return safeString;
});

export const httpTriggerExecutor : NodeExecutor<HTTPExecutionData> = async({
    nodeId,
    context,
    step, 
    data
}) => {
    // add a loading publish state 
    if(!data.endpoint) {
        // add a failed status here later
        throw new NonRetriableError("Endpoint not available for execution");
    }

    if(!data.variable){
        // add a failed status here later
        throw new NonRetriableError("Variable name not provided for storing response");
    }

    const result = await step.run("http-trigger", async() => {
        const method : Method = data.method || "GET" 
        
        const response =  await axios.request({
            url: Handlebars.compile(data.endpoint)(context),
            method,
            data: (method === "PUT" || "POST" || "PATCH") ? Handlebars.compile(data.body || "{}")(context)  : {},
            headers : (method === "PUT" || "POST" || "PATCH") ? {
                "Content-Type" : "application/json"
            } : {}
        })

        const responseData = response.data
        const responsePayload = {
             httpResponse : {
                status : response.status,
                statusText : response.statusText,
                data : responseData,
                contentType : response.headers["content-type"]
            }
        }

            return {
                ...context,
                [data.variable] : responsePayload
            }
        
    }) 

    // add a completed success status here later 

    return result;
}