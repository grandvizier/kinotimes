import React from 'react'
import { Grid, Typography, Popover } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        popover: {
            pointerEvents: 'none',
            width: "100%",
        },
    }),
);

type SmallTheaterProps = {
    timestamp: string;
    theater: Theater;
}

type Theater = {
    name: string;
    street: string;
    kietz: string;
    telephone: string;
    website: string;
}


export default function SmallFilm({
    timestamp, theater
}: SmallTheaterProps) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };;
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;

    if (!theater) {
        theater = {name: "", street: "", kietz: "", telephone: "", website: ""}
    }

    const theaterPopover = <Popover
        id={id}
        open={open}
        className={classes.popover}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        disableRestoreFocus
    >
        <Grid item>
            <Typography>{ theater.street ? theater.street : "" }</Typography>
            <br/>
            <Typography>{ theater.kietz ? theater.kietz : "" }</Typography>
            <br/>
            <Typography>{ theater.website ? theater.website : "" }</Typography>
        </Grid>
    </Popover>

    return (
        <Grid item
            className="showtime"
            aria-owns={open ? id : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handleClose}
        >{timestamp}
            <Typography variant="body2">
                ({theater.name ? theater.name : ""})
            </Typography>
            {theaterPopover}
        </Grid>
    )
}
