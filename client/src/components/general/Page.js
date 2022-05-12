import { makeStyles } from "@material-ui/styles";

const Page = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: `${props.flexDirection}`,
      justifyContent: `${props.justifyContent}`,
      alignItems: `${props.alignItems}`,
      alignContent: `${props.alignContent}`,
      marginBottom: "2rem"
    },
  }));

  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
};

export default Page;
