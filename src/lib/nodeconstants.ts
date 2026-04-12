import { HttpNode } from "@/components/workflowById/editor-canvas/excutions/http/node";
import { InitialNode } from "@/components/workflowById/editor-canvas/nodeComponent";
import { ManualNode } from "@/components/workflowById/editor-canvas/Triggers/manual/node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : ManualNode,
     [NodeType.HTTP_TRIGGER] : HttpNode
} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof nodeComponents