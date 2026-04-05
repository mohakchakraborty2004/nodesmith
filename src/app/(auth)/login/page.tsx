import LoginForm from "@/components/auth/login-form"
import { RequireAuth, RequireUnAuth } from "@/lib/auth-utils"

const Login = async() => {
 await RequireUnAuth();
 return <div>
    <LoginForm></LoginForm>
 </div>
}

export default Login