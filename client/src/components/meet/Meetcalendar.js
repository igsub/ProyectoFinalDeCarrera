import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Calendar } from 'react-multi-date-picker'
import { useState } from 'react'

const Meetcalendar = () => {

    const [focusedDate, setFocusedDate] = useState();

    const handleDateClick = (event) => {
        console.log(event.day,event.month.name,event.year)
    }

    return <Calendar 
                multiple
                onFocusedDateChange={setFocusedDate} 
                className="bg-dark"
                plugins={[
                    <DatePanel                               
                        markFocused
                        focusedClassName="bg-red" 
                        sort="date"
                        onClickDate={handleDateClick}
                        />,
                    <DatePickerHeader 
                        position="top" 
                        size="small" 
                        style={{ backgroundColor: "steelblue" }} 
                    />
                    ]}
                mapDays={({ date, isSameDate }) => {
                    let props = {}
                    
                    if (!isSameDate(date, focusedDate)) return
                
                    props.style = { backgroundColor: "red" }
                    
                    return props
                    }}
                onChange={array => { //Array of Dateobjecs
                    alert("selected dates :\n" + array.join(",\n"))
                }}
                >
                
            </Calendar> 
}

export default Meetcalendar