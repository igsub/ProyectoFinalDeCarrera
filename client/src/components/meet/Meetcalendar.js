import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Calendar } from 'react-multi-date-picker'
import { useState } from 'react'
import _ from 'lodash';
import moment from 'moment';

const Meetcalendar = ({setSelectedDate}) => {

    const [focusedDate, setFocusedDate] = useState();
    const [datetimes, setDateTimes] = useState([]);

    const handleDateClick = (event) => {
        console.log(event.day,event.month.name,event.year)
    }

    const onCalendarChange = array => { 
        array.forEach(dateitem => {
            const idx = _.findIndex(datetimes, (dt) => {_.isEqual(dt.dateitem, dateitem)});
            console.log("IDX: ",idx);
            setSelectedDate(dateitem.day+"/"+dateitem.month+"/"+dateitem.year);
            if (idx === -1){
                const newDatetimesArray = _.clone(datetimes);
                const newDatetimesObject = {dateitem: dateitem, times: []};
                newDatetimesArray.push(newDatetimesObject)
                setDateTimes(newDatetimesArray);
            }
            else{
                const newDatetimesArray = _.clone(datetimes);
                setDateTimes(newDatetimesArray.splice(idx, 1))
            }
        });
    }

    return <Calendar 
                multiple
                onFocusedDateChange={setFocusedDate}              
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
                        onClickDate={handleDateClick}
                        />,
                    <DatePickerHeader 
                        position="top" 
                        size="small" 
                        style={{ backgroundColor: "steelblue" }} 
                    />
                    ]}
                
                >
                
            </Calendar> 
}

export default Meetcalendar