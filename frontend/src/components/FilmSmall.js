import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Typography} from '@material-ui/core'
import PlusCircleIcon from '@material-ui/icons/PlusOneOutlined'
const FilmSmall = ({onClick, title, img}) => (
    <Grid item xs={3} onClick={onClick} className="filteredFilm">
        <PlusCircleIcon/>
        <Grid item xs={12}>
            <Typography>{title}</Typography>
        </Grid>
        <Grid item>
            <img src={img} alt={title} className="small-thumbnail"/>
        </Grid>
    </Grid>
)

FilmSmall.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default FilmSmall
