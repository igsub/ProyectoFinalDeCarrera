import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Calendar } from 'react-multi-date-picker'
import { useState } from 'react'

const Meetcalendar = () => {

    const [focusedDate, setFocusedDate] = useState();
    const [datetimes, setDateTimes] = useState([]);

    const handleDateClick = (event) => {
        console.log(event.day,event.month.name,event.year)
        //show times for that date
    }

    const onCalendarChange = array => { 
        array.forEach(dateitem => {
            if (datetimes.indexOf(JSON.stringify(dateitem)) === -1) {
                setDateTimes(datetimes.push({
                    dateitem,
                    times:[]
                }
                ))
            }
            else
                setDateTimes(datetimes.splice(datetimes.indexOf(JSON.stringify(dateitem)), 1))
        });
        //Array of Dateobjecs
        //alert("selected dates :\n" + array.join(",\n"))
        console.log(datetimes)
    }

    return <Calendar 
                multiple
                onFocusedDateChange={setFocusedDate} 
                className="bg-dark"
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