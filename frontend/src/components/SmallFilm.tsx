import React from 'react'
import { Grid, Typography, Popover } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import dayjs from 'dayjs'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // TODO: as each popover apears in a row,
        // there is less space for the width
        popover: {
            pointerEvents: 'none',
            width: "50%",
        },
        title: {
            color: `#bf997e`,
        },
        photo: {
            paddingRight: '20px',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        language: {
            color: 'red',
            fontWeight: 400,
            fontSize: 'small',
        },
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
    }),
);

type SmallFilmProps = {
    onClick: () => void;
    film_title: string;
    film_image: string;
    film_details: any;
    times: [string];
}

export default function SmallFilm({
    onClick, film_title, film_image, film_details, times
}: SmallFilmProps) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;
    const uid = () => {
        return '_' + Math.random().toString(36).substr(2, 9)
    }
    if (!times) {
        times = ['--']
    }
    let filmDetails = film_details ? film_details : {};
    const bull = <span className={classes.bullet}>•</span>;
    let showLanguage = filmDetails.language && filmDetails.language.indexOf("English") === -1;

    const timePopover = <Popover
        id={id}
        open={open}
        className={classes.popover}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
    >
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.title}>{filmDetails.aka &&
                    <span className="altTitle">({filmDetails.aka})</span>}</Typography>
                <Typography>
                    {filmDetails.year}{bull}{filmDetails.genre}
                </Typography>
                {showLanguage ? <Typography className={classes.language}>{filmDetails.language}</Typography> : null}
                {filmDetails.director ? <Typography className={classes.contentTitle}>
                    Director: <span className={classes.contentText}>{filmDetails.director}</span></Typography> : null}

                {filmDetails.actors ? <Typography className={classes.contentTitle}>
                    Actors: <span className={classes.contentText}>{filmDetails.actors}</span></Typography> : null}

                <Typography variant="body2" className={classes.contentDesc}>{filmDetails.description}</Typography>
            </Grid>
            <Grid item>
                {times.map(t => (
                    <Typography key={uid()} className="showtime">{dayjs(t).format('h:mm a Do MMM')}</Typography>
                    ))}
            </Grid>
        </Grid>
    </Popover>

    return (
        <Grid item xs={4} md={2}
            className="film"
            aria-owns={open ? id : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            <Grid item>
                <Typography aria-describedby={id}>{film_title}</Typography>
            </Grid>
            <Grid container>
                <Grid item xs={9} className="details">
                    <img src={film_image} alt={film_title} className="small-thumbnail" />
                </Grid>
                {timePopover}
            </Grid>
        </Grid>
    )
}
