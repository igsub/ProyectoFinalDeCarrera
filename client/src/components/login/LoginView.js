import { Button } from "@material-ui/core"
import { useAuth0 } from "@auth0/auth0-react"

const LoginView = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button onClick={()=>loginWithRedirect()}>Login</Button>
    );
};

export default LoginView;