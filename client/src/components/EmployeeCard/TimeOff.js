import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
class TimeOff extends Component {
  render() {
    return (
      <CardContainer>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
        When it's on the employees directory page, it should show pending PTO */}
        <p>Requested Time Off</p>
      </CardContainer>
    )
  }
}

export default TimeOff

TimeOff.propTypes = {
  // adding propTypes here
}
