import React from 'react'
import ViewFilter from '../containers/ViewFilters'
import Filters from '../containers/Filters'
// import Genres from '../containers/Genres'
import DateFilters from '../containers/DateFilters'
import { PanelGroup, Panel } from 'react-bootstrap'

const Sidebar = () => (
  <PanelGroup className="filters pre-scrollable" id="sidebar">
    <Panel defaultExpanded eventKey="11">
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
    <Panel defaultExpanded header="Time" eventKey="12">
      <DateFilters />
    </Panel>
    {/* Remove genre filtering for now
        logic is buggy, and not sure how best to make it usable
    */}
    {/*<Panel collapsible expanded header="Genres" eventKey="13">
      <Genres />
    </Panel> */}
    <Panel defaultExpanded eventKey="14">
      <Filters />
    </Panel>
  </PanelGroup>
)

export default Sidebar
