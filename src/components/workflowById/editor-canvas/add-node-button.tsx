"use client"

import { Button } from "@base-ui/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { NodeSelector } from "./Nodeselector"

export const AddButton = memo(()=> {
    const [selector , setSelector] = useState(false)


    return <>
    <NodeSelector onOpenChange={setSelector} open={selector}>
         <Button 
        onClick={() => {
        }}
        className="h-10 w-10 bg-slate-400 hover:bg-slate-200 transition-all rounded-2xl flex justify-center items-center cursor-pointer">
                 <PlusIcon className="size-4"></PlusIcon>
        </Button>
    </NodeSelector>
    </>
})

AddButton.displayName = "AddButton"