"use client"

import { Button } from "@/components/ui/button"
import { useUpdateWorkflowNode } from "@/hooks/client-suspense"
import { editorAtom } from "@/lib/atom"
import { useAtomValue } from "jotai"

interface buttonProps {
    id : string,
}

export const UpdateButton = ({
id
}: buttonProps) => {

    const editor = useAtomValue(editorAtom)

    const update = useUpdateWorkflowNode();
    const handleUpdate = (id : string ) => {
        if(!editor){
            return;
        }

           const nodes = editor.getNodes()
           const edges = editor.getEdges()

        update.mutate({
            id, 
            node : nodes,
            edge : edges
        })
    }

    return <>
     <Button
     onClick={() => handleUpdate(id)}
     className="cursor-pointer"
     disabled={update.isPending}
     >
        {update.isPending ? "updating..." : "Update Workflow"}
     </Button>
    </>
}