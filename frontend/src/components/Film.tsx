import * as React from 'react'
import {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardMedia, Typography, Grid, Paper} from "@material-ui/core";
import MapShowtimes from "../containers/MapShowtimes";
import {ShowTime} from "../types";
import classNames from "classnames";

import BanIcon from "@material-ui/icons/Warning";
import StarOffIcon from "@material-ui/icons/StarOutlined";
import StarOnIcon from "@material-ui/icons/Star";

const styles = {
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 30px`,
    },
    paper: {
        maxWidth: '90%',
        margin: `10px auto`,
        padding: `20px`,
        backgroundColor: `rgba(50,50,50,0.9)`,
    },
    title: {
        color: '#E1BB77',
    },
    contentText: {
        color: '#FFFFFF',
    }
};

export interface Props {
    onFilterClick: () => void;
    onFilmSave: () => void;
    title: string;
    imdbID: string;
    img: string;
    // what is details reviewed and favorite type
    details: any;
    showtimes: ShowTime[];
    reviewed: boolean;
    favorite: any;
}

class Film extends React.Component<Props> {

    render() {
        const {
            onFilterClick,
            onFilmSave,
            title,
            imdbID,
            img,
            details,
            showtimes,
            reviewed,
            favorite
        } = this.props;

        let filmDetails = details ? details : {};
        let imagePath = img !== "N/A" ? img : "/image_not_found.jpg";
        // don't show films if there's no times to display
        if (!showtimes.length) {
            return null;
        }

        let detailsStyle = classNames("", {reviewed: !reviewed}); // if not reviewed, grey things out
        return (
            <div style={styles.root}>
                <Paper style={styles.paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            {filmDetails.aka && <div className="altTitle">{filmDetails.aka}</div>}
                            <Grid container spacing={8} className={detailsStyle}>
                                <Grid item xs={2}>
                                    <img alt={title} src={imagePath}/>
                                    <Grid item className="filter favorite" onClick={onFilmSave}>
                                        <StarOnIcon className={favorite && "starred"}/>
                                        <Typography className="filterText">{favorite ? "saved" : "save"}</Typography>
                                    </Grid>
                                    <Grid item className="filter filterOut" onClick={onFilterClick}>
                                        <BanIcon/>
                                        <Typography className="filterText">filter</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={10}>
                                    <Grid item container>
                                        <Grid item className="details">
                                            <Typography variant="subtitle1"
                                                        style={styles.title}>{title}</Typography>
                                            <Typography
                                                style={styles.contentText}>Genre: {filmDetails.genre}</Typography>
                                            <Typography style={styles.contentText}>Year: {filmDetails.year}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid className="details">
                                            {filmDetails.director ? <Typography
                                                style={styles.contentText}>Director: {filmDetails.director}</Typography> : null}
                                            <Typography
                                                style={styles.contentText}>Rating: {filmDetails.rating}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item>
                                            <Typography style={styles.contentText}>
                                                Actors: {filmDetails.actors}
                                            </Typography>
                                            {filmDetails.language ?
                                                <Typography className="language"
                                                            style={styles.contentText}>{filmDetails.language}</Typography> : null
                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item xs={8} className="details">
                                            <Typography variant="body1"
                                                        style={styles.contentText}>{filmDetails.description}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {false &&
                        <Grid item>
                            <MapShowtimes showtimes={showtimes}/>
                        </Grid>
                        }
                    </Grid>

                </Paper>
                <br/>
            </div>
        );
    }
}

export default Film;
