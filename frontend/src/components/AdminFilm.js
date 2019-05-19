import React from "react";
import PropTypes from "prop-types";
import AdminUpdateFilm from "./AdminUpdateFilm";

import {Grid, Typography, Link} from "@material-ui/core";

const AdminFilm = ({
                       handleSubmit,
                       _id,
                       title,
                       originalID,
                       imdbID,
                       img,
                       details,
                       showtimes,
                       reviewed,
                       originalDetails
                   }) => {
    let imdbUrl = "http://www.imdb.com/find?ref_=nv_sr_fn&s=all&q=" + title;
    let filmDetails = details ? details : {};
    let origDetails = originalDetails ? originalDetails : {};
    let isfilmReviewd = reviewed ? true : false;
    // let showtimesCount = (showtimes.length === 1) ? showtimes[0].timestamp : showtimes.length;
    let showtimesCount = showtimes.length;
    let altTitle = filmDetails.aka ? filmDetails.aka : null;

    return (
        <Grid container spacing={24}
              className={"editDetails " + (isfilmReviewd ? "reviewed" : "")}
        >
            <Typography variant="h3">
                {title}
            </Typography>
            <Typography variant="caption">
                ({showtimesCount})
            </Typography>
            {altTitle && <div className="altTitle">{altTitle}</div>}
            <Grid item>
                <Grid item xs={6} className="details">
                    <span className="type col-xs-6">Current IMDB </span>
                    <span className="value"> {imdbID} </span>
                </Grid>
                <Grid item xs={6} className="details">
                    <span className="type col-xs-4">Country</span>
                    <span className="value">{filmDetails.country}</span>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={6} className="details">
                    <span className="type"> Director </span>
                    <span className="value">{filmDetails.director}</span>
                </Grid>
                <Grid item xs={6} className="details">
                    <span className="type col-xs-4">Year</span>
                    <span className="value">{filmDetails.year}</span>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={6} className="details">
                    <Typography>Actors</Typography>
                </Grid>
                <Grid item xs={6} className="details">
                    <Typography>{filmDetails.actors}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={24}>
                <Grid item xs={12} className="details">
                    <Typography>Genre</Typography>
                </Grid>
                <Grid item xs={12} className="details">
                    <Typography>{filmDetails.genre}</Typography>
                </Grid>
            </Grid>
            <Grid container pacing={24}>
                <Grid item>
                    <Link
                        href={imdbUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Search
                        IMDB
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={originalID} target="_blank" rel="noopener noreferrer">
                        {originalID ? "Original data" : ""}
                    </Link>
                </Grid>
            </Grid>
            <Grid container spacing={24} className="extraDetails">
                <Grid item>
                    <Typography
                        className={"value" + ((filmDetails.director && origDetails.director !== filmDetails.director) ? " different" : "")}>
                        {origDetails.director}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        className={"value" + ((filmDetails.country && origDetails.country !== filmDetails.country) ? " different" : "")}>
                        {origDetails.country}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        className={"value" + ((filmDetails.year && origDetails.year !== filmDetails.year) ? " different" : "")}>
                        {origDetails.year
                        }
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={6} className="updateFilm">
                <AdminUpdateFilm form={`updateImdb_${_id}`} imdbID={imdbID} onSubmit={handleSubmit}/>
            </Grid>

            <Grid item sm={6} md={6} className="details">
                <img src={img} alt={title} className="pull-right"/>
            </Grid>
        </Grid>
    )
        ;
};

AdminFilm.propTypes = {
    title: PropTypes.string.isRequired
};

export default AdminFilm;
