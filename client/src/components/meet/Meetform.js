import { Button, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import datetimesService from "../../services/datetimesService";
import Meetcalendar from "./Meetcalendar";
import Timelist from "./Timelist";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  form: {
    display: "flex",
    borderRadius: "8px",
    //backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "2rem",
    padding: "2rem",
  },
  submitButton: {
    display: "flex",
    alignSelf: "center",
    padding: "2rem",
  },
  nextPrev: {
    display: "flex",
    justifyContent: "flex-end",
  },
  calendar: {
    display: "flex",
    flexDirection: "row",
  },
  switchWeather: {
    marginTop: "1rem",
  },
}));

const Meetform = () => {
  const [datetime, setDatetime] = useState([]);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTimes, setSelectedTimes] = useState([]);
  const meetState = useSelector((state) => state.meet);

  useEffect(() => {}, [selectedDate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //datetimesService.addNewDatetime({meetId: uuidv4(), userId: "da", start: 3, end:5, description: "ddescripcion larga"})
  };

  const displayDateTimes = () => {
    datetimesService.getAll().then((item) => setDatetime(item.data));
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div></div>
        <Box className={classes.calendar}>
          <Meetcalendar setSelectedDate={setSelectedDate} />
          <Timelist setSelectedTimes={setSelectedTimes} />
        </Box>
        <Box className={classes.submitButton}>
          <Button type="submit" variant="contained" color="primary">
            Crear
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Meetform;
