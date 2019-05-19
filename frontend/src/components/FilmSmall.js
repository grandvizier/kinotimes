import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Typography} from '@material-ui/core'
import PlusCircleIcon from '@material-ui/icons/PlusOneOutlined'
const FilmSmall = ({onClick, title, img}) => (
    <Grid container onClick={onClick} className="filteredFilm">
        <PlusCircleIcon/>
        <Grid item>
            <Typography>{title}</Typography>
        </Grid>
        <Grid container>
            <Grid item xs={9}>
                <img src={img} alt={title}/>
            </Grid>
        </Grid>
    </Grid>
)

FilmSmall.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default FilmSmall
