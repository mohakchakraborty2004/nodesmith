import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Copy, FileCode, Check, ExternalLink, MousePointerClick } from "lucide-react";
import { useState } from "react";

export default function GoogleTriggerDialog({
    open,
    onOpenChange
}: {
    open: boolean,
    onOpenChange: () => void
}) {
    const params = useParams();
    const [copiedScript, setCopiedScript] = useState(false);
    const workflowId = params.workflowId as string;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const WebhookUrl = `${baseUrl}/api/google-form?workflowId=${workflowId}`;

    const scriptCode = `function onFormSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  var responses = {};
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    responses[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
  }
  var payload = {
    formId: e.source.getId(),
    formTitle: e.source.getTitle(),
    responseId: formResponse.getId(),
    timestamp: formResponse.getTimestamp(),
    respondentEmail: formResponse.getRespondentEmail(),
    responses: responses
  };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };
  var WEBHOOK_URL = '${WebhookUrl}';
  try {
    UrlFetchApp.fetch(WEBHOOK_URL, options);
  } catch(error) {
    console.error('Webhook failed:', error);
  }
}`;

    const copyToClipboard = async (text: string, type: "url" | "script") => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${type === "url" ? "Webhook URL" : "Apps Script"} copied to clipboard`);
            if (type === "script") {
                setCopiedScript(true);
                setTimeout(() => setCopiedScript(false), 2000);
            }
        } catch (error) {
            toast.error("Failed to copy text");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="p-1.5 bg-orange-100 text-orange-600 rounded-md">
                             <MousePointerClick size={20} />
                        </span>
                        Google Form Trigger
                    </DialogTitle>
                    <DialogDescription>
                        Connect your Google Form to this workflow using Apps Script.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Webhook URL Section */}
                    <div className="p-4 bg-slate-50 border rounded-lg space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Webhook URL
                        </label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={WebhookUrl}
                                className="flex-1 bg-white border px-3 py-2 rounded text-sm font-mono text-slate-600 focus:outline-none"
                            />
                            <button
                                onClick={() => copyToClipboard(WebhookUrl, "url")}
                                className="flex items-center gap-2 bg-white border hover:bg-slate-50 px-4 py-2 rounded text-sm font-medium transition shadow-sm"
                            >
                                <Copy size={16} />
                                Copy
                            </button>
                        </div>
                    </div>

                    {/* Step-by-step Guide */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            Setup Instructions
                        </h3>
                        
                        <div className="grid gap-4 text-sm text-slate-600">
                            <div className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">1</span>
                                <p>
                                    Open your <a href="https://docs.google.com/forms" target="_blank" className="text-blue-600 hover:underline inline-flex items-center gap-1">Google Form <ExternalLink size={12}/></a> and click <strong>More (⋮)</strong> &gt; <strong>Script editor</strong>.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">2</span>
                                <div className="space-y-3 w-full">
                                    <p>Delete any existing code and paste the automation script:</p>
                                    <button 
                                        onClick={() => copyToClipboard(scriptCode, "script")}
                                        className="w-full py-3 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 rounded-xl flex items-center justify-center gap-2 transition-all group"
                                    >
                                        {copiedScript ? (
                                            <><Check size={18} className="text-green-600" /> <span className="text-green-600 font-medium">Copied!</span></>
                                        ) : (
                                            <><FileCode size={18} className="text-slate-400 group-hover:text-blue-500" /> <span className="font-medium text-slate-700">Copy the script</span></>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">3</span>
                                <p>
                                    In the editor, click the <strong>Clock icon (Triggers)</strong> on the left sidebar, then click <strong>+ Add Trigger</strong>.
                                </p>
                            </div>

                            <div className="ml-9 p-3 bg-blue-50 border border-blue-100 rounded-md">
                                <p className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-tight">Required Trigger Settings:</p>
                                <ul className="space-y-1 text-xs text-blue-700">
                                    <li>• Choose function: <span className="font-mono font-bold">onFormSubmit</span></li>
                                    <li>• Event source: <span className="font-bold">From form</span></li>
                                    <li>• Event type: <span className="font-bold">On form submit</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}