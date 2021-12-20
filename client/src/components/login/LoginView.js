import { Button } from "@material-ui/core"
import { useAuth0 } from "@auth0/auth0-react"

const LoginView = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect().then(value => {
            console.log(value)
        })
    }

    return (
        <Button onClick={handleLogin}>Login</Button>
    );
};

export default LoginView;