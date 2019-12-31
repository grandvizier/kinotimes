import * as React from 'react'
import {
    Typography,
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from "@material-ui/core";
import MapShowtimes from "../containers/MapShowtimes";
import {ShowTime} from "../types";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BanIcon from "@material-ui/icons/Warning";
// import StarOffIcon from "@material-ui/icons/StarOutlined";
import StarOnIcon from "@material-ui/icons/Star";

const styles = {
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 30px`,
    },
    expansion: {
        color: 'rgba(168, 166, 173,0.9)'
    },
    paper: {
        maxWidth: '90%',
        margin: `10px auto`,
        backgroundColor: `rgba(168, 166, 173,0.9)`,
    },
    title: {
        // color: '#000000',
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
    language: {
        color: 'red',
        fontWeight: 400,
        fontSize: 'small',
    },
    panelHeader: {
        borderBottom: '1px solid rgba(0,0,0,.125)',
        backgroundColor: `#000000`,
        color: `#D4AF37`,
    },
    showtimeContent: {
        backgroundColor: `rgba(168, 166, 173,0.9)`,
    }
};

export interface Props {
    onFilterClick: () => void;
    onFilmSave: () => void;
    title: string;
    img: string;
    // what is details reviewed and favorite type
    details: any;
    showtimes: ShowTime[];
    favorite: any;
}

class Film extends React.Component<Props> {

    render() {
        const {
            onFilterClick,
            onFilmSave,
            title,
            img,
            details,
            showtimes,
            favorite
        } = this.props;

        let filmDetails = details ? details : {};
        let imagePath = img !== "N/A" ? img : "/image_not_found.jpg";
        // don't show films if there's no times to display
        if (!showtimes.length) {
            return null;
        }
        let showLanguage = filmDetails.language && filmDetails.language.indexOf("English") === -1
        // let detailsStyle = classNames("", {reviewed: !reviewed}); // if not reviewed, grey things out


        // https://material-ui.com/components/cards/
        return (
            <div style={styles.root}>
                <ExpansionPanel style={styles.paper} square>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={styles.expansion} />} style={styles.panelHeader}>
                        <Grid container justify="space-evenly" alignItems="flex-start">
                            <Grid container item xs={2} md={2}>
                                <img alt={title} src={imagePath} className="small-thumbnail"    />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Grid>
                                    <Typography style={styles.title}>{title} {filmDetails.aka &&
                                    <div className="altTitle">({filmDetails.aka})</div>}</Typography>
                                    <Typography style={styles.contentText}>{filmDetails.genre}</Typography>
                                    <Typography style={styles.contentText}>{filmDetails.year}</Typography>
                                    <Typography style={styles.contentText}>{filmDetails.rating}</Typography>
                                    {filmDetails.director ? <Typography style={styles.contentTitle}>
                                        Director: <span style={styles.contentText}>{filmDetails.director}</span></Typography> : null}

                                    {filmDetails.actors ? <Typography style={styles.contentTitle}>
                                        Actors: <span style={styles.contentText}>{filmDetails.actors}</span></Typography> : null}

                                    {showLanguage ?
                                        <Typography style={styles.language}>{filmDetails.language}</Typography> : null
                                    }
                                </Grid>
                                <Grid>
                                    <Typography variant="body1" style={styles.contentDesc}>{filmDetails.description}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={2} md={2}></Grid>
                            <Grid container item xs={2} md={2}>
                                <Grid item xs={8} className="filter favorite" onClick={onFilmSave}>
                                    <StarOnIcon className={favorite && "starred"}/>
                                    <Typography
                                        className="filterText">{favorite ? "saved" : "save"}</Typography>
                                </Grid>
                                <Grid item xs={4} className="filter filterOut" onClick={onFilterClick}>
                                    <BanIcon/>
                                    <Typography className="filterText">filter</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={styles.showtimeContent}>
                        <Grid container justify="space-evenly" alignItems="flex-start">
                            <Grid item xs={12} md={8}>
                                <MapShowtimes showtimes={showtimes}/>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Film;
