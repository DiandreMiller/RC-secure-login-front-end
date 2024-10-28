import React from 'react'
import LoginAndSignUpComponent from './LoginAndSignUpComponent'

describe('<LoginAndSignUpComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginAndSignUpComponent />)
  })
})