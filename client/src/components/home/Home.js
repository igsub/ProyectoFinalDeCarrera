import Page from "../General/Page";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import logo from "../../Images/MeetApp-logos_black.png";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react"

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
	const { isAuthenticated } = useAuth0()

  return (
    <Page
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <img alt="" src={logo} className={classes.logo} />
      <Typography variant="h4" gutterBottom className={classes.title}>
        Create your meeting easily!
      </Typography>
      {isAuthenticated? 
        <Button
          component={Link}
          to="/step1"
          variant="contained"
          color="secondary"
        >
          New Meeting
        </Button>
      : <Typography variant="h6">Log in to create a new meeting</Typography>}
    </Page>
  );
};

export default Home;
