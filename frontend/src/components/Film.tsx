import React from 'react'
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Collapse,
    IconButton
} from "@material-ui/core";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import MapShowtimes from "../containers/MapShowtimes";
import {ShowTime} from "../types";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import BanIcon from "@material-ui/icons/Warning";
// import StarOffIcon from "@material-ui/icons/StarOutlined";
import StarOnIcon from "@material-ui/icons/Star";


const styles = {
    contentTitle: {
        // color: '#000000',
        fontWeight: 600,
        fontSize: 'smaller',
    },
    contentText: {
        // color: '#000000',
        fontWeight: 100,
        fontSize: 'small',
    },
    contentDesc: {
        padding: '8px 0',
        // color: '#000000',
        fontWeight: 100,
        fontSize: 'small',
        fontStyle: 'italic',
    },
};

const useStyles = makeStyles(theme => ({
    card: {
        margin: '50px',
        backgroundColor: `rgba(0, 0, 0, 0.8)`,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    title: {
        color: `#bf997e`,
    },
    language: {
        color: 'red',
        fontWeight: 400,
        fontSize: 'small',
    },
    rating: {
        color: `#bf997e`,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        lineHeight: '50px',
        textAlign: 'center',
        border: 'white solid 2px'
    },
    showtimeContent: {
        backgroundColor: `rgba(0, 0, 0, 0.1)`,
        backgroundImage: 'linear-gradient(rgba(35,35,35,0.2) 20%, rgba(25,25,25,0))',
        color: `#bf997e`,
    }
}));

type FilmProps = {
    onFilterClick: () => void;
    onFilmSave: () => void;
    title: string;
    img: string;
    // what is details reviewed and favorite type
    // https://www.robinwieruch.de/react-pass-props-to-component
    details: any;
    showtimes: ShowTime[];
    favorite: any;
}

// is there a cleaner way to pass in the props
// https://www.robinwieruch.de/react-function-component
export default function Film({
    onFilterClick,
    onFilmSave,
    title,
    img,
    details,
    showtimes,
    favorite
}: FilmProps) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    let filmDetails = details ? details : {};
    let imagePath = img !== "N/A" ? img : "/image_not_found.jpg";
    let showLanguage = filmDetails.language && filmDetails.language.indexOf("English") === -1;

    const bull = <span className={classes.bullet}>•</span>;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // TODO
    //  add divider(s) where needed
    // https://material-ui.com/components/dividers/

    return (
    <Card className={classes.card}>
        <CardContent>
            <Grid container>
                <Grid item xs={3} md={2}>
                    <img alt={title} src={imagePath} className="small-thumbnail" />
                </Grid>
                <Grid item xs={4} md={6}>
                    <Typography className={classes.title}>{title} {filmDetails.aka &&
                        <span className="altTitle">({filmDetails.aka})</span>}</Typography>
                    <Typography>
                        {filmDetails.year}{bull}{filmDetails.genre}
                    </Typography>
                    {showLanguage ? <Typography className={classes.language}>{filmDetails.language}</Typography> : null}
                    {filmDetails.director ? <Typography style={styles.contentTitle}>
                        Director: <span style={styles.contentText}>{filmDetails.director}</span></Typography> : null}

                    {filmDetails.actors ? <Typography style={styles.contentTitle}>
                        Actors: <span style={styles.contentText}>{filmDetails.actors}</span></Typography> : null}

                    <Typography variant="body2" style={styles.contentDesc}>{filmDetails.description}</Typography>
                </Grid>
                <Grid item xs={1} md={2}>
                    <Typography className={classes.rating}>{filmDetails.rating}</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <StarOnIcon />
                        </IconButton>
                        <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.showtimeContent}>
                <MapShowtimes showtimes={showtimes}/>
            </CardContent>
        </Collapse>
    </Card>
    );
}

