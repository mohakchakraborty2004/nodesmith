import { workFlowParams } from "@/lib/params-nuqs";
import { createLoader } from "nuqs/server";


export const workflowLoader = createLoader(workFlowParams);