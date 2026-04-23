import {
Dialog,
DialogContent,
DialogHeader, 
DialogDescription,
DialogTitle
} from "@/components/ui/dialog"

export default function ManualTriggerDialog({
    open,
    onOpenChange
}: {
    open : boolean,
    onOpenChange : () => void
}) {

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Manual Trigger
                        </DialogTitle>
                        <DialogDescription>
                            This node triggers the workflow
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-3 flex justify-center items-center">
                        <p>
                            Clicking this node will trigger the workflow , no configs available for this.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}