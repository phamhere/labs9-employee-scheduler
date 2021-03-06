import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { renderWithRouter } from '../../testing/utils'
import App from '../App'

describe('App component', () => {
  it('renders hello', () => {
    const { getByText } = renderWithRouter(<App />)
    expect(getByText('Cadence')).toBeInTheDocument()
  })

  // below commented out as components have changed
  // it('routes to calendar on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/calendar/i), leftClick)
  //   expect(container.innerHTML).toMatch('Calendar')
  // })
  // it('routes to Employees on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/employees/i), leftClick)
  //   expect(container.innerHTML).toMatch('Employees')
  // })
  // it('routes to Create Schedule on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/schedule/i), leftClick)
  //   expect(container.innerHTML).toMatch('Schedule')
  // })
  // it('routes to Settings on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/settings/i), leftClick)
  //   expect(container.innerHTML).toMatch('Settings')
  // }) // settings commented out (not built yet)
})
