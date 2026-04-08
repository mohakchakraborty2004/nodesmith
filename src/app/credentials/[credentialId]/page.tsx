interface CredentialProps {
    params : Promise<{
        credentialId : string
    }>
}

const Credential = async ({params}: CredentialProps) => {
    const { credentialId } = await params;

    return (
        <div>
            <h1>Credential ID: {credentialId}</h1>
        </div>
    )
}

export default Credential