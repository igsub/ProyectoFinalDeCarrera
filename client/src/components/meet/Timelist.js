import React, {useEffect, useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, makeStyles } from '@material-ui/core';
import TimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(() => ({
    selectedListItem: {
        backgroundColor: "lightgrey"
    },
    listItem: {
        backgroundColor: null
    }
}))
// const times = [
//     "00:00", "00:30", 
//     "01:00", "01:30", 
//     "02:00", "02:30", 
//     "03:00", "03:30", 
//     "04:00", "04:30", 
//     "05:00", "05:30", 
//     "06:00", "06:30", 
//     "07:00", "07:30",
//     "08:00", "08:30",
//     "09:00", "09:30",
//     "10:00", "10:30",
//     "11:00", "11:30",
//     "12:00", "12:30",
//     "13:00", "13:30",
//     "14:00", "14:30",
//     "15:00", "15:30",
//     "16:00", "16:30",
//     "17:00", "17:30",
//     "18:00", "18:30",
//     "19:00", "19:30",
//     "20:00", "20:30",
//     "21:00", "21:30",
//     "22:00", "22:30",
//     "23:00", "23:30",
// ]

const fourHourTime = [
    {
       start: "8:00",
       end: "12:00", 
    },
    {
        start: "12:00",
        end: "16:00"
    },
    {
        start: "16:00",
        end: "20:00"
    },
    {
        start: "20:00",
        end: "24:00"
    },
]

const Timelist = (props) => {

    const { setSelectedTimes } = props;
    const classes = useStyles();
    const [checked, setChecked] = useState([]);

    const handleCheck = (value) => {
        const idx = checked.indexOf(value);
        const newValues = [...checked]
        idx === -1? newValues.push(value) : newValues.splice(idx, 1);
        setChecked(newValues);
        setSelectedTimes(newValues);
    };

    return <List style={{maxHeight: 400, overflow: 'auto'}}>
        {fourHourTime.map(t => 
            <ListItem className={checked.indexOf(t) !== -1? classes.selectedListItem : classes.listItem} key={t.start} button onClick={() => handleCheck(t)}>
                    <ListItemIcon>
                        <Checkbox                         
                            edge="start"
                            checked={checked.indexOf(t) !== -1}
                            disableRipple
                        />
                    </ListItemIcon>               
                <ListItemIcon>
                    <TimeIcon />
                </ListItemIcon>
                <ListItemText primary= {`${t.start} - ${t.end}`} />
            </ListItem>
            )
        }
    </List>
    
}

export default Timelist
