import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardHeader, CardContent} from '@material-ui/core'
import MapFilmsWithTimes from '../containers/MapFilmsWithTimes'

const Theater = ({onClick, name, street, kietz, website, showtimes, filters}) => {
    if (!showtimes.length) {
        return null
    }
    let theaterDetails = street + " | " + kietz + " | " + website

    return (
        <Card>
            <CardHeader
                title={name}
                subheader={theaterDetails}
            />
            <CardContent>
                <MapFilmsWithTimes showtimes={showtimes} onClick={onClick} filters={filters}/>
            </CardContent>
        </Card>
    )
}

Theater.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Theater
