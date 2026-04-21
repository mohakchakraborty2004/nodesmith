import { NodeExecutor } from "@/lib/types-executor-Fns"
import { NonRetriableError } from "inngest";
import axios, { Method } from "axios"

type HTTPExecutionData = {
    endpoint ?: string,
    method ? : string | any
    body ? : string
    variable ? : string
}

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
            url: data.endpoint,
            method,
            data: (method === "PUT" || "POST" || "PATCH") ? data.body : {},
            headers : (method === "PUT" || "POST" || "PATCH") ? {
                "Content-Type" : "application/json"
            } : {}
        })

        const contentType = response.headers["Content-Type"];
        const isJson = typeof contentType === "string" && contentType.includes("application/json");
        const responseData = isJson ? JSON.parse(response.data): JSON.stringify(response.data)
        const responsePayload = {
             httpResponse : {
                status : response.status,
                statusText : response.statusText,
                data : responseData,
                contentType : response.headers["Content-Type"]
            }
        }

        if(data.variable) {
            return {
                ...context,
                [data.variable] : responsePayload
            }
        }
        
        //fallback
        return {
            ...context,
            httpResponse : {
                status : response.status,
                statusText : response.statusText,
                data : responseData,
                contentType : response.headers["Content-Type"]
            }
        }
    }) 

    // add a completed success status here later 

    return result;
}