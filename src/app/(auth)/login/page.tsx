import LoginForm from "@/components/auth/login-form"
import { RequireAuth } from "@/lib/auth-utils"

const Login = async() => {
await RequireAuth();
 return <div>
    <LoginForm></LoginForm>
 </div>
}

export default Login