import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { ExecuteWorkflow } from "./functions";

export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    ExecuteWorkflow
  ],
});