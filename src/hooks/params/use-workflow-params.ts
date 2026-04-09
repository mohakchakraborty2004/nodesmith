import { workFlowParams } from "@/lib/params-nuqs"
import {useQueryStates} from "nuqs"

export const useWorkflowParams = () => {
    return useQueryStates(workFlowParams);
}