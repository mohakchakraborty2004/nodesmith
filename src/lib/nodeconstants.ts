import { GeminiNode } from "@/components/workflowById/editor-canvas/excutions/gemini/node";
import { HttpNode } from "@/components/workflowById/editor-canvas/excutions/http/node";
import { InitialNode } from "@/components/workflowById/editor-canvas/nodeComponent";
import { GoogleNode } from "@/components/workflowById/editor-canvas/Triggers/googleForm/node";
import { ManualNode } from "@/components/workflowById/editor-canvas/Triggers/manual/node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : ManualNode,
    [NodeType.HTTP_TRIGGER] : HttpNode,
    [NodeType.GOOGLE_FORM_TRIGGER] : GoogleNode,
    [NodeType.GEMINI_TRIGGER] : GeminiNode,
} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof nodeComponents