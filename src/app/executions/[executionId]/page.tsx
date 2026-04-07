interface ExecutionIdProps {
    params : Promise<{
        executionIdId : string
    }>
}

const ExecutionId = async ({params}: ExecutionIdProps) => {
    const { executionIdId } = await params;

    return (
        <div>
            <h1>Execution ID: {executionIdId}</h1>
        </div>
    )
}

export default ExecutionId