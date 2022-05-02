import Page from "../General/Page";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import logo from "../../Images/MeetApp-logos_black.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "50vw",
  },
  title: {
    fontSize: "3vw"
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <img src={logo} className={classes.logo} />
      <Typography variant="h4" gutterBottom className={classes.title}>
        Crea tu reunión fácilmente
      </Typography>
      <Button
        component={Link}
        to="/step1"
        variant="contained"
        color="secondary"
      >
        Nueva Reunión
      </Button>
    </Page>
  );
};

export default Home;
