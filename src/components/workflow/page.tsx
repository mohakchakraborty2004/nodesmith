"use client"


import { useCreateWorkflow, useSuspenseWorkflow } from "@/hooks/client-suspense";
import useSearch from "@/hooks/params/use-debounce-search";
import { useWorkflowParams } from "@/hooks/params/use-workflow-params";
import { useState } from "react";
import { Input } from "../ui/input";
import { Pagination } from "../pagination";
import { Button } from "../ui/button";



export default function WorkflowPage() {
    const  workflows  = useSuspenseWorkflow();
    const createWorkflow = useCreateWorkflow();
    const [params , setParams] = useWorkflowParams()
    const {searchValue , onSearchChange} = useSearch({
        params,
        setParams,
        debounceMS: 1000
    })

    return (
        <div>
              <Button onClick={() => {
                createWorkflow.mutate()
            }}>
                Create Workflow
            </Button>
            <Input value={searchValue} onChange={(e) => onSearchChange(e.target.value)}></Input>
            {
             JSON.stringify(workflows)
             
            }

            <div>
                {workflows.data.totalPages > 0 && (
                    <Pagination 
                        page={params.page} 
                        totalPages={workflows.data.totalPages}
                        isDisabled={workflows.isFetching}
                        onPageChange={(page) => setParams({ ...params, page })}
                    />
                )}
            </div>
          
        </div>
    )
}