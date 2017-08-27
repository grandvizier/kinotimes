import React from 'react'
import Filters from '../containers/Filters'

const Header = () => (
  <p>
    Show:
    {' '}
    <Filters filter="byTitle">
      Title
    </Filters>
    {', '}
    <Filters filter="byTheater">
      Theater
    </Filters>
    {', '}
    <Filters filter="byTime">
      Time
    </Filters>
  </p>
)

export default Header