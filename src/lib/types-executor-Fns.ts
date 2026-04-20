import { GetStepTools, Inngest } from "inngest";

export type workFlowContext = Record<string, unknown>;

export type stepTools = GetStepTools<Inngest.Any>

export interface NodeExecutorParams <TData = Record<string , unknown>> {
    data : TData 
    nodeId : string 
    context : workFlowContext,
    step : stepTools
    //publish : to be added real time later
}

export type NodeExecutor<Tdata = Record<string, unknown>> = (
    params : NodeExecutorParams<Tdata>
) => Promise<workFlowContext>