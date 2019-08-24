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
        <Grid item sm={6}
              className={"editDetails " + (isfilmReviewd ? "reviewed" : "")}
        >
            <Typography variant="h5">
                {title} <span className="caption">({showtimesCount})</span>
            </Typography>
            {altTitle && <div className="altTitle">{altTitle}</div>}
            <Grid container justify="space-between" alignItems="flex-start">
                <Grid item xs={6} className="details">
                    <span className="type col-xs-6">Current IMDB </span>
                    <span className="value"> {imdbID} </span>
                </Grid>
                <Grid item xs={6} className="details">
                    <span className="type col-xs-4">Country</span>
                    <span className="value">{filmDetails.country}</span>
                </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="flex-start">
                <Grid item xs={6} className="details">
                    <span className="type"> Genre </span>
                    <span className="value">{filmDetails.genre}</span>
                </Grid>
                <Grid item xs={6} className="details">
                    <span className="type col-xs-4">Year</span>
                    <span className="value">{filmDetails.year}</span>
                </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="flex-start">
                <Grid item xs={3} className="details">
                    <span className="type"> Director</span>
                </Grid>
                <Grid item xs={9} className="details">
                    <span className="value"> {filmDetails.director}</span>
                </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="flex-start">
                <Grid item xs={3} className="details">
                    <span className="type"> Actors</span>
                </Grid>
                <Grid item xs={9} className="details">
                    <span className="value"> {filmDetails.actors}</span>
                </Grid>
            </Grid>
            <Grid item>
                <Link
                    href={imdbUrl} target="_blank"
                    underline="hover"
                    rel="noopener noreferrer">
                    Search IMDB
                </Link>
                <Link href={originalID} target="_blank"
                    underline="hover"
                    rel="noopener noreferrer">
                    {originalID ? "Original data" : ""}
                </Link>
            </Grid>
            <Grid item spacing={2} className="extraDetails">
                <Typography variant="caption"
                    className={"value" + ((filmDetails.director && origDetails.director !== filmDetails.director) ? " different" : "")}>
                    {origDetails.director}
                </Typography>
                <Typography variant="caption"
                    className={"value" + ((filmDetails.country && origDetails.country !== filmDetails.country) ? " different" : "")}>
                    {origDetails.country}
                    </Typography>
                <Typography variant="caption"
                    className={"value" + ((filmDetails.year && origDetails.year !== filmDetails.year) ? " different" : "")}>
                    {origDetails.year}
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={4} sm={4} spacing={2}>
                    <AdminUpdateFilm form={`updateImdb_${_id}`} imdbID={imdbID} onSubmit={handleSubmit}/>
                </Grid>

                <Grid item xs={6} sm={6} className="details">
                    <img src={img} alt={title} className="small-thumbnail"/>
                </Grid>
            </Grid>
        </Grid>
    )
        ;
};

AdminFilm.propTypes = {
    title: PropTypes.string.isRequired
};

export default AdminFilm;
