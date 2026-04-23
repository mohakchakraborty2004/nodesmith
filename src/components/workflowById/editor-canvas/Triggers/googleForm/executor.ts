import { NodeExecutor } from "@/lib/types-executor-Fns"

type ManualTriggerData = Record<string , unknown>

export const GoogleTriggerExecutor : NodeExecutor<ManualTriggerData> = async({
    nodeId,
    context,
    step
}) => {
    // add a loading publish state 

    const result = await step.run("manual-trigger", async() => context) 

    // add a completed success status here later 

    return result;
}