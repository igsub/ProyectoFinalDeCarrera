import React, { useState } from "react";
import { TextField, Box, Button } from "@material-ui/core"
import Page from "../general/Page"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TitleIcon from '@material-ui/icons/Title';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import MyGoogleMap from "../googlemap/MyGoogleMap";
import '../../App.css';
import GoogleAutocomplete from "../googlemap/GoogleAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setDescription, setLocation, setTitle } from "../../Store/meetSlice";

const useStyles = makeStyles((theme) => ({
    root:{
    },
    textfieldContainer: {
        margin: "0.4rem",
        width: "50%"
    },
    textfield: {
        width: "100%"
    },
    button: {
        margin: "1rem"
    },
    map: {
        height: "60vh",
        width: "50%",
        margin: "10px 50px",
        filter: "drop-shadow(-1px 5px 3px #ccc)",
    }
  }));

const Step1 = () => {
    const dispatch = useDispatch();
    const meetState = useSelector(state => state.meet);

    const [meetDescription, setMeetDescription] = useState("");
    const [meetTitle, setMeetTitle] = useState("");

    const [mapState, setMapState] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [-38.7135817, -62.2509458],
        zoom: 12,
        address: '',
        draggable: true,
        lat: -38.7135817,
        lng: -62.2509458
    });

    const [autocompleteState, setAutocompleteState] = useState({
        value: null,
        inputValue: '',
        options: []
    });

    const onClick = () => {
        dispatch(setTitle(meetTitle));
        dispatch(setDescription(meetDescription));
        dispatch(setLocation({lat: mapState.lat, lng: mapState.lng, address: mapState.address}))
    }

    const classes = useStyles();
    return <Page flexDirection="column" justifyContent="center" alignItems="center" alignContent="center" >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <TitleIcon style={{fill: "darkgrey"}}/>
            <TextField variant="standard" label="Título" className={classes.textfield} onChange={e => setMeetTitle(e.target.value)}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <EventNoteIcon style={{fill: "darkgrey"}}/>
            <TextField variant="standard" label="Notas adicionales" className={classes.textfield} onChange={e => setMeetDescription(e.target.value)}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <LocationOnIcon style={{fill: "darkgrey"}}/>
            <GoogleAutocomplete mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState}/>
        </Box>
        <Box className={classes.map}>
            <MyGoogleMap mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState}/>
        </Box>
        <Button onClick={onClick} component={Link} to="/meetform" type="submit" variant="contained" color="primary" className={classes.button}>Siguiente</Button>
    </Page>
}

export default Step1