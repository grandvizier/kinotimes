import React from 'react'
import ViewFilter from '../containers/ViewFilters'
import Filters from '../containers/Filters'

const Header = () => (
  <div>
    <ViewFilter filter="byTitle">
      Title
    </ViewFilter>
    {'  '}
    <ViewFilter filter="byTheater">
      Theater
    </ViewFilter>
    {'  '}
    <ViewFilter filter="byTime">
      Time
    </ViewFilter>
    <Filters />
  </div>
)

export default Header