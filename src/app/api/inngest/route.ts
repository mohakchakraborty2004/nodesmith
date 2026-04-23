import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { ExecuteWorkflow } from "./functions";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    ExecuteWorkflow
  ],
});