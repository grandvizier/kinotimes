import React from 'react'
import {Card, CardHeader, CardContent, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MapFilmsWithTimes from '../containers/MapFilmsWithTimes'

import MapIcon from '@material-ui/icons/MapTwoTone';


const useStyles = makeStyles(theme => ({
    card: {
        margin: '50px',
        backgroundColor: `rgba(0, 0, 0, 0.8)`,
        borderRadius: '20px',
        border: "3px solid rgb(237, 208, 179)",
    },
    link: {
        color: `#fff`,
    },
}));

type TheaterProps = {
    onClick: () => void;
    name: string;
    street: string;
    kietz: string;
    telephone: string;
    website: string;
    showtimes: string;
    filters: object;
}

export default function Theater({
    onClick, name, street, kietz, website, showtimes, filters
}: TheaterProps) {
    const classes = useStyles();

    if (!showtimes.length) {
        return null
    }

    let theaterDetails = street
    if (kietz)
        theaterDetails += " | " + kietz
    if (website)
        theaterDetails += " | " + website

    const renderMapLink = () => {
        if (street) {
            let uri = "https://www.google.com/maps/search/?api=1&query=" + street
            return <Link className={classes.link}
                href={encodeURI(uri)} target="_blank"
                underline="hover"
                rel="noopener noreferrer">
                <MapIcon />
            </Link>
        } else {
            return null
        }
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                title={name}
                subheader={theaterDetails}
            />
            {renderMapLink()}
            <CardContent>
                <MapFilmsWithTimes showtimes={showtimes} onClick={onClick} filters={filters}/>
            </CardContent>
        </Card>
    )
}
