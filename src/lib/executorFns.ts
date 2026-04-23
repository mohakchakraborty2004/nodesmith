import { NodeType } from "@/generated/prisma/enums";
import { error } from "console";
import { NodeExecutor } from "./types-executor-Fns";
import { manualTriggerExecutor } from "@/components/workflowById/editor-canvas/Triggers/manual/executor";
import { httpTriggerExecutor } from "@/components/workflowById/editor-canvas/excutions/http/executor";
import { GoogleTriggerExecutor } from "@/components/workflowById/editor-canvas/Triggers/googleForm/executor";
import { GeminiTriggerExecutor } from "@/components/workflowById/editor-canvas/excutions/gemini/executor";

const executorRegistry: Partial<Record<NodeType, NodeExecutor<any>>> = {
      [NodeType.MANUAL_TRIGGER] : manualTriggerExecutor,
      [NodeType.HTTP_TRIGGER] : httpTriggerExecutor as NodeExecutor<any>,
      [NodeType.INITIAL] : manualTriggerExecutor,
      [NodeType.GOOGLE_FORM_TRIGGER] : GoogleTriggerExecutor,
      [NodeType.GEMINI_TRIGGER] : GeminiTriggerExecutor
    }

export const getExecutor = (nodeType: NodeType) : NodeExecutor => {
    const executor = executorRegistry[nodeType]

    if(!executor){
        throw new Error("No executor found for"+ nodeType)
    }

    return executor;
}

