import React from 'react'
import LinkItem from './common/LinkItem'
import styled from '@emotion/styled'
import system from '../design/theme'

// this breadcrumb will be placed at the top should show the following links
// Home component --> Sign Up || Sign In (if not logged in) --> Log Out (if logged)

const BreadCrumb = props => {
  // initialize content for condition
  let breadContent
  // ask the recieving component what location will be
  if (props.location !== 'Home') {
    breadContent = (
      <Nav fixed={false}>
        <Container logo>
          <LinkItem to="/">Cadence</LinkItem>
          <p> {props.location}</p>
        </Container>
      </Nav>
    )
  }
  if (props.location === 'Home') {
    breadContent = (
      <Nav fixed={true}>
        <Container logo>
          <LinkItem to="/">Cadence</LinkItem>
        </Container>

        <Container className="breadcrumbs" extra>
          <LinkItem to="/register">Sign Up</LinkItem>
          <LinkItem to="/login">Log In</LinkItem>
        </Container>
      </Nav>
    )
  }

  return breadContent
}

export default BreadCrumb

// basic styling to match design file
const Container = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${props => (props.extra ? '150px' : null)};
  a {
    font-size: ${props =>
      props.logo ? system.fontSizing.l : system.fontSizing.m};
    font-weight: ${props => (props.logo ? 'bold' : null)};
    color: ${system.color.neutral};
    text-decoration: none;
    text-align: center;
  }
  p {
    font-size: ${system.fontSizing.s};
    color: ${system.color.neutral};
    margin: 5px 15px 0;
    word-spacing: 5px;
  }
`

// for some pages (currently just home) nav is fixed
// for others, it is static and does not scroll with the page

const Nav = styled.nav`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'static')};
  z-index: 100;
  top: 0;
  background: ${system.color.primary};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 10rem;
  height: 7.5rem;
  margin-bottom: ${({ fixed }) => (fixed ? '10rem' : '1rem')};
`
