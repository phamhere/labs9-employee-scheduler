import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'

// this component might feature a full monthly read only version of the calendar?
class Calendar extends Component {
  state = {
    location: 'Calendar'
  }
  render() {
    return (
      <div>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
      </div>
    )
  }
}

export default Calendar

Calendar.propTypes = {
  // add propstypes here
}
