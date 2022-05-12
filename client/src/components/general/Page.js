import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion/dist/framer-motion"

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
  return (
  <motion.div 
    className={classes.root}
    initial={{width: 0}}
    animate={{width: "100%"}}
    exit={{x: window.innerWidth, transition: { duration: 0.1 }}}
    >
      {props.children}
    </motion.div>)
};

export default Page;
