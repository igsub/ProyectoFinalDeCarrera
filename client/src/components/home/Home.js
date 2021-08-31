import Page from "../general/Page";
import Typography from '@material-ui/core/Typography';

const Home = () => {
    return (
        <Page flexDirection="column" justifyContent="center" alignItems="center" alignContent="center">
            <Typography variant="h2" gutterBottom>Bienvenido a Meet App</Typography>
            <Typography variant="h4" gutterBottom>Crea tu reunion facilmente</Typography>
        </Page>
    )
}

export default Home;