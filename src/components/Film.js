import React from 'react'
import PropTypes from 'prop-types'

const Film = ({ onClick, title, imdbID, img, details, showtimes, reviewed }) => (
  <li
    onClick={onClick}
  >
    <div className="panel panel-default">
        <div className="panel-heading">
            {title}
        </div>
        <div className="panel-body">
            { imdbID ? imdbID : ""}
            <img src={img ? img : ""} alt="-" className="img-responsive thumbnail"/>
        </div>
    </div>


  </li>
)

Film.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
  // details: PropTypes.object.isRequired,
  // createdAt: PropTypes.number.isRequired
}

export default Film