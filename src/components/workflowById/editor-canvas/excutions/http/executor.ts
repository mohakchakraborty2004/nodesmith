import { NodeExecutor } from "@/lib/types-executor-Fns"
import { NonRetriableError } from "inngest";
import axios, { Method } from "axios"

type HTTPExecutionData = {
    endpoint ?: string,
    method ? : string | any
    body ? : string
}

export const httpTriggerExecutor : NodeExecutor<HTTPExecutionData> = async({
    nodeId,
    context,
    step, 
    data
}) => {
    // add a loading publish state 
    if(!data.endpoint) {
        throw new NonRetriableError("Endpoint not available for execution");
    }

    const result = await step.run("http-trigger", async() => {
        const method : Method = data.method || "GET" 
        
        const response =  await axios.request({
            url: data.endpoint,
            method,
            data: (method === "PUT" || "POST" || "PATCH") ? data.body : {} 
        })

        const contentType = response.headers["Content-Type"];
        const isJson = typeof contentType === "string" && contentType.includes("application/json");
        const responseData = isJson ? JSON.parse(response.data): JSON.stringify(response.data)
        
        return {
            ...context,
            httpResponse : {
                status : response.status,
                statusText : response.statusText,
                data : responseData,
                contentType : contentType
            }
        }
    }) 

    // add a completed success status here later 

    return result;
}