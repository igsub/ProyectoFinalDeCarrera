import { TextField, Grid, Typography } from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import TitleIcon from "@material-ui/icons/Title"
import EventNoteIcon from "@material-ui/icons/EventNote"
import { makeStyles } from "@material-ui/core/styles"
import { Title } from "@material-ui/icons"


const useStyles = makeStyles((theme) => ({
	root: {},
	labelColor: {
        color: theme.palette.secondary.dark
    },
    value: {
        textAlign: "center"
    }
}))

const DisplayMeetData = ({title, description, location}) => {
	const classes = useStyles()

    return (
        <>
        <Grid item xs={12}>
            <Typography variant="h5" className={classes.labelColor}>
                Title
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.value}>
                {title}
            </Typography>
        </Grid>
        {description ? <>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.labelColor}>
                    Description
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.value}>
                    {description}
                </Typography>
            </Grid>
            </>
        : null}
        {location && location.address ?
        <>
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.labelColor}>
                    Location
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" className={classes.value}>
                    {location.address}
                </Typography>
            </Grid>
        </> 
        :null}
        </>
    )
}

export default DisplayMeetData