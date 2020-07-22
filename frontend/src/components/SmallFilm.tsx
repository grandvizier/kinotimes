import React from 'react'
import { Grid, Typography, Popover } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import dayjs from 'dayjs'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        popover: {
            pointerEvents: 'none',
            width: "100%",
        },
    }),
);

type SmallFilmProps = {
    onClick: () => void;
    film_title: string;
    film_image: string;
    times: [string];
}

export default function SmallFilm({
    onClick, film_title, film_image, times
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

    const timePopover = <Popover
        id={id}
        open={open}
        className={classes.popover}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
    >
        <Grid item>
            {times.map(t => (
                <Typography key={uid()} className="showtime">{dayjs(t).format('h:mm a Do MMM')}</Typography>
            ))}
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
