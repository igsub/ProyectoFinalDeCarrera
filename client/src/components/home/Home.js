import Page from "../general/Page";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Home = () => {
    
    return (
        <Page flexDirection="column" justifyContent="center" alignItems="center" alignContent="center">
            <Typography variant="h2" gutterBottom>Bienvenido a Meet App</Typography>
            <Typography variant="h4" gutterBottom>Crea tu reunion facilmente</Typography>
            <Button component={Link} to="/meetform" variant="contained" color="secondary">Create New Meeting</Button>
        </Page>
    )
}

export default Home;