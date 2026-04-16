import {
Dialog,
DialogContent,
DialogHeader, 
DialogDescription,
DialogTitle
} from "@/components/ui/dialog"
import z from "zod";

const schema = z.object({
    endpoint : z.string({message : "Endpoint is required"}).url({message : "Invalid URL"}),
      method : z.enum(["GET" , "POST" , "PUT" , "DELETE" , "PATCH"]),
        body : z.string().optional()
})


type Props = {
    open : boolean,
    onOpenChange : (open : boolean) => void;
    onSubmit : (values : z.infer<typeof schema>) => void;
    defaultEndpoint ? : string;
    defaultMethod ? : "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}


export default function HttpDialog ({
    open,
    onOpenChange, 
    onSubmit,
    defaultEndpoint,
    defaultMethod
}: Props ){

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            HTTP Execution Node
                        </DialogTitle>
                        <DialogDescription>
                            Configure the HTTP execution node to make HTTP requests to external APIs or services as part of your workflow. You can specify the endpoint, HTTP method, request body, and other relevant settings to customize the behavior of the node according to your requirements.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-3 flex justify-center items-center">
                        <p>
                            Http calls
                        </p>
                    </div>
                    <div className="">

                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}