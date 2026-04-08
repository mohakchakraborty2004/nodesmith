interface WorkflowProps {
    params : Promise<{
        workflowId : string
    }>
}

const Workflow = async ({params}: WorkflowProps) => {
    const { workflowId } = await params;

    return (
        <div>
            <h1>Workflow ID: {workflowId}</h1>
        </div>
    )
}

export default Workflow