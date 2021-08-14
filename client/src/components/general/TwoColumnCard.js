import './TwoColumnCard.css';

const TwoColumnCard = (props) =>{
    const classes = 'two-column-card ' + props.className;
    return <div className={classes}>{props.children}</div>
}

export default TwoColumnCard