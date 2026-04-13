import {
Dialog,
DialogContent,
DialogHeader, 
DialogDescription,
DialogTitle
} from "@/components/ui/dialog"

export default function HttpDialog({
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
                            HTTP Execution Node
                        </DialogTitle>
                        <DialogDescription>
                            This node executes execution calls
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-3 flex justify-center items-center">
                        <p>
                            Http calls
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}