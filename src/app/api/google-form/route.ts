import { inngest } from "@/inngest/client";
import { init } from "@paralleldrive/cuid2";
import { NextRequest, NextResponse } from "next/server";



export default async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const workflowId = searchParams.get("workflowId");

    if (!workflowId) {
        return NextResponse.json({ error: "Workflow ID is required" }, { status: 400 });
    }

    const body = await req.json();
    console.log("Received Google Form submission:", body);

    const googleformData ={
        formId : body.formId,
        formResponseId : body.responseId,
        formTitle : body.formTitle,
        responses : body.responses,
        respondentEmail: body.respondentEmail,
        timestamp : body.timestamp
    }

    try {
        await inngest.send({
                    name : "myapp/execute-workflow",
                    data : { 
                        id : workflowId,
                        initialData : {
                            googleForm : googleformData
                        }
                    }
                })
        return NextResponse.json({ message: "Workflow triggered successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error handling Google Form submission:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}