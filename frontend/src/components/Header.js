import React from 'react'
import ViewFilter from '../containers/ViewFilters'
import Filters from '../containers/Filters'
import DateFilters from '../containers/DateFilters'

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
    <DateFilters />
    <Filters />
  </div>
)

export default Header