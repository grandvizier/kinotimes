import React from 'react'
import ViewFilter from '../containers/ViewFilters'
import Filters from '../containers/Filters'
import DateFilters from '../containers/DateFilters'
import { PanelGroup, Panel } from 'react-bootstrap'

const Header = () => (
  <PanelGroup className="filters">
    <Panel collapsible expanded="true" eventKey="11">
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
    </Panel>
    <Panel collapsible expanded="true" header="Time" eventKey="12">
      <DateFilters />
    </Panel>
    <Panel collapsible expanded="true" header="Genres" eventKey="13">
    </Panel>
    <Panel collapsible expanded="true" eventKey="14">
      <Filters />
    </Panel>
  </PanelGroup>
)

export default Header