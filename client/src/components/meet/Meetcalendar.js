import React, { useState } from 'react'
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Calendar } from 'react-multi-date-picker'
import _ from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { setMeet } from '../../Store/meetSlice'

const Meetcalendar = (props) => {

    
    const dispatch = useDispatch();
    const meetState = useSelector(state => state.meet);
    const { setSelectedDate } = props;
    const [focusedDate, setFocusedDate] = useState();
    const [currentDate, setCurrentDate] = useState(null);

    const formatDateObject = (dateObj) => {
        return dateObj? moment(dateObj).format(dateObj.format()) : null ;
    };

    const onDatePanelClick = (date) => {
        console.log("DATE PANEL CLICK: ", date)

        // cuando se clickea una fecha se deben mostrar los rangos de horarios clickeados previamente
    };

    const onCalendarChange = array => { 
        console.log("ARRAY ON CHANGE:", array )
        if (array.length === 0){
            dispatch(setMeet({ ...meetState, datetimes: [] }));
        } else {
            array.forEach(dateitem => {
                const formattedDate = formatDateObject(dateitem);
                console.log(formattedDate)
                const idx = _.findIndex(meetState.datetimes , (dt) => dt.date.localeCompare(formattedDate) === 0);
                console.log("IDX: ",idx);
                const newDatetimesArray = _.clone(meetState.datetimes);

                if (idx === -1){
                    const newDatetimesObject = { date: formattedDate };
                    newDatetimesArray.push(newDatetimesObject)
                    dispatch(setMeet({ ...meetState, datetimes: newDatetimesArray}));
                }
                else{
                    dispatch(setMeet({ ...meetState, datetimes: newDatetimesArray.splice(idx, 1) }))
                }
            });
        }
    }

    const onCalendarDateClick = (date) => {
        console.log("CLICKED DATE: ", date)
        if (date) {
            const formattedDate = moment(date).format(date.format())
            setCurrentDate(formattedDate);
        }
    }

    return <Calendar 
                multiple
                onFocusedDateChange={onCalendarDateClick}              
                mapDays={({ date, isSameDate }) => {
                    let props = {}
                    
                    if (!isSameDate(date, focusedDate)) return
                
                    props.style = { backgroundColor: "green" }
                    
                    return props
                    }}
                onChange={onCalendarChange}
                plugins={[
                    <DatePanel                               
                        markFocused
                        focusedClassName="bg-green" 
                        sort="date"
                        onClickDate={onDatePanelClick}
                        />,
                    <DatePickerHeader 
                        position="top" 
                        size="small" 
                        style={{ backgroundColor: "steelblue" }} 
                    />
                    ]}
                />        
}

export default Meetcalendar