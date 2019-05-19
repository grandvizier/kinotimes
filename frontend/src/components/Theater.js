import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardContent} from '@material-ui/core'
import MapFilmsWithTimes from '../containers/MapFilmsWithTimes'

const Theater = ({onClick, name, street, kietz, website, showtimes, filters}) => {
    if (!showtimes.length) {
        return null
    }

    return (
        <Card>
            <CardHeader>{name}</CardHeader>
            <CardContent>
                <span className="theaterDetails">{street} {kietz} {website}</span>
                <MapFilmsWithTimes showtimes={showtimes} onClick={onClick} filters={filters}/>
            </CardContent>
        </Card>
    )
}

Theater.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Theater
