import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'
// import bgImg from '../img/fff.jpg'
import bg from '../img/bg.jpg' // https://unsplash.com/photos/PypjzKTUqLo img by Roman Bozhko
import Button from './common/Button'
import LinkItem from './common/LinkItem'
import OuterContainer from './common/OuterContainer'

// this is the main landing page, it will house the payment options and main site branding styles. The nav here will display as Sign Up || Sign In.
// if a user is logged in already, it will display the Schedule now button and the navbar will change to logout.
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Home'
    }
  }

  render() {
    return (
      <OuterContainer>
        <BreadCrumb location={this.state.location} />
        <Container src={bg}>
          <h1>Scheduling your employees is hard.</h1>
          <p>
            Cadence is an easy-to-use shift scheduling tool. You'll never have
            to waste time worrying about wasting time ever again.
          </p>
          <Button type="text">
            <LinkItem to="/employees">Schedule Now</LinkItem>
          </Button>
        </Container>
      </OuterContainer>
    )
  }
}

export default Home

Home.propTypes = {
  // add propTypes here
}

const Container = styled('div')`
  margin: 7.5rem 7.5rem 0;
  height: 68rem;
  background-image: url(${props => props.src});
  background-position: top;
  background-size: cover;

  h1 {
    padding: 75px ${system.spacing.bigPadding} 0;
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.xl};
    width: 65rem;
    font-weight: bold;
  }
  p {
    padding: ${system.spacing.bigPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.ml};
    width: 60rem;
    margin-bottom: 25px;
  }
  button {
    margin-left: 2.5rem;
    a {
      color: ${system.color.neutral};
    }
  }
`
