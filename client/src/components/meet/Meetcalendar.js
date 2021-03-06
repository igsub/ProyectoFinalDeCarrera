import React, { useEffect, useState } from "react";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { Calendar } from "react-multi-date-picker";
import _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setMeet } from "../../Store/meetSlice";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import "./styles.css"

const useStyles = makeStyles((theme) => ({
 
}))

const Meetcalendar = (props) => {
  const dispatch = useDispatch();
  const meetState = useSelector((state) => state.meet);
  const [focusedDate, setFocusedDate] = useState();
  const [datesArray, setDatesArray] = useState([]);
  const theme = useTheme()
  const classes = useStyles()

  useEffect(() => {
    const formattedFocusedDate = formatDateObject(focusedDate);
    const idx = meetState.datetimes.findIndex(
      (dt) => dt.date === formattedFocusedDate
    );

    const foundTimes = meetState.datetimes[idx]?.times || [];

    dispatch(
      setMeet({
        ...meetState,
        currentDate: formattedFocusedDate,
        currentTimes: foundTimes,
      })
    );
  }, [focusedDate]);

  const formatDateObject = (dateObj) => {
    return dateObj ? moment(dateObj).format(dateObj.format()) : null;
  };

  const onCalendarChange = (array) => {
    const newDateTimes = _.cloneDeep(meetState.datetimes);
    const newArray = array.map((d) => formatDateObject(d));
    let valueToAdd = null;
    newArray.find((d) => {
      if (meetState.datetimes.findIndex((dt) => dt.date === d) === -1) {
        valueToAdd = d;
      }
    });

    if (valueToAdd) {
      newDateTimes.push({ date: valueToAdd, times: [] });
      dispatch(setMeet({ ...meetState, datetimes: newDateTimes }));
    } else {
      let valueToRemove = null;
      meetState.datetimes.find((dt) => {
        if (newArray.findIndex((d) => d === dt.date) === -1) {
          valueToRemove = dt.date;
        }
      });

      const rmvIxd = meetState.datetimes.findIndex(
        (e) => e.date === valueToRemove
      );
      newDateTimes.splice(rmvIxd, 1);
      dispatch(setMeet({ ...meetState, datetimes: newDateTimes }));
    }

    setDatesArray(newArray);
  };

  const onCalendarDateClick = (currentDate) => {
    setFocusedDate(currentDate);
  };

  return (
    <Calendar
      className={"closeer"}
      multiple
      onFocusedDateChange={onCalendarDateClick}
      mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
        let props = {
          //className: "highlight-red"
        };

        // props.style = {
        //   color: "black"
        // }

        // if (isSameDate(date, today)) props.style = {
        //    ...props.style, 
        //   backgroundColor: theme.palette.secondary.light,
        //   color: "white" }

        if (isSameDate(date, focusedDate)) {
          props.style = { 
            ...props.style, 
            backgroundColor: theme.palette.secondary.main, 
            color: "white" }
          return props
        };

        if (_.findIndex(selectedDate, sd => isSameDate(sd, date)) !== -1) {
          props.style = { backgroundColor: theme.palette.secondary.light, color: "white" }
          return props
        }

        return props;
      }}
      onChange={onCalendarChange}
      plugins={[
        <DatePanel markFocused  sort="date" />,
        <DatePickerHeader
          position="top"
          size="small"
          style={{ backgroundColor: theme.palette.secondary.dark }}
        />,
      ]}
    />
  );
};

export default Meetcalendar;
