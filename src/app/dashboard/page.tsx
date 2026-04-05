import Dashboard from "@/components/dashboard/dashboard";
import { RequireAuth } from "@/lib/auth-utils";


const DashboardPage = async () => {
    await RequireAuth();
    return (
        <div>
            <h1>Dashboard</h1>
            <Dashboard></Dashboard>
        </div>
    )
}

export default DashboardPage