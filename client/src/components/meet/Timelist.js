import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import TimeIcon from "@material-ui/icons/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { setMeet } from "../../Store/meetSlice";
import _ from "lodash";

const useStyles = makeStyles(() => ({
  selectedListItem: {
    backgroundColor: "lightgrey",
  },
  listItem: {
    backgroundColor: null,
  },
}));

const fourHourTime = [
  {
    range: 1,
    start: "8:00",
    end: "12:00",
  },
  {
    range: 2,
    start: "12:00",
    end: "16:00",
  },
  {
    range: 3,
    start: "16:00",
    end: "20:00",
  },
  {
    range: 4,
    start: "20:00",
    end: "24:00",
  },
];

const Timelist = (props) => {
  const { setSelectedTimes } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const meetState = useSelector((state) => state.meet);

  const handleCheck = (value) => {
    const newValues = _.cloneDeep(meetState.currentTimes) || [];
    const idx = _.findIndex(newValues, (t) => t.range === value.range);

    idx === -1 ? newValues.push(value) : newValues.splice(idx, 1);

    const newDatetimes = _.cloneDeep(meetState.datetimes);
    const datetimesIdx = _.findIndex(
      newDatetimes,
      (dt) => dt.date === meetState.currentDate
    );
    newDatetimes[datetimesIdx].times = newValues;

    setSelectedTimes(newValues);
    dispatch(
      setMeet({
        ...meetState,
        currentTimes: newValues,
        datetimes: newDatetimes,
      })
    );
  };

  return (
    <List style={{ maxHeight: 400, overflow: "auto" }}>
      {fourHourTime.map((t) => (
        <ListItem
          className={
            meetState.currentTimes &&
            _.findIndex(
              meetState.currentTimes,
              (ct) => ct.range === t.range
            ) !== -1
              ? classes.selectedListItem
              : classes.listItem
          }
          key={t.start}
          button
          onClick={() => handleCheck(t)}
          disabled={meetState.currentDate ? false : true}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={
                _.findIndex(meetState.currentTimes, (ct) =>
                  ct ? t.range === ct.range : -1
                ) !== -1
              }
              disableRipple
            />
          </ListItemIcon>
          <ListItemIcon>
            <TimeIcon />
          </ListItemIcon>
          <ListItemText primary={`${t.start} - ${t.end}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default Timelist;
