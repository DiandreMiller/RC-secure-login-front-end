/// <reference types="cypress" />

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress-react-unit-test';
import LoginAndSignUpComponent from '../Components/LoginAndSignUpComponent'; // Adjust the path as needed

describe('Login and Sign Up Component', () => {
    beforeEach(() => {
        // Mount the component in MemoryRouter
        mount(
            <MemoryRouter initialEntries={['/']}>
                <LoginAndSignUpComponent />
            </MemoryRouter>
        );
    });

    it('should render the login form by default', () => {
        cy.contains('Login').should('be.visible');
        cy.get('input[name="username"]').should('not.exist'); // Username field should not be present
    });

    it('should toggle to sign-up form', () => {
        cy.contains('Sign Up').click();
        cy.contains('Sign Up').should('be.visible');
        cy.get('input[name="username"]').should('exist'); // Username field should be present
    });

    it('should submit the sign-up form successfully', () => {
        cy.contains('Sign Up').click();

        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="phoneNumber"]').type('1234567890');
        cy.get('input[name="dateOfBirth"]').type('2000-01-01');

        cy.intercept('POST', `${Cypress.env('REACT_APP_BACKEND_API')}/sign-up`, {
            statusCode: 200,
            body: { message: 'User created successfully' },
        }).as('signUpRequest');

        cy.get('button[type="submit"]').click();

        cy.wait('@signUpRequest').then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200); // Ensure the expect is returned
        });
        // Add assertions to check if you navigated to the right page
        cy.url().should('include', '/movies'); // Change to the expected URL
    });

    it('should submit the login form successfully', () => {
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');

        cy.intercept('POST', `${Cypress.env('REACT_APP_BACKEND_API')}/sign-in`, {
            statusCode: 200,
            body: { token: 'mockToken', expiresIn: 3600 },
        }).as('loginRequest');

        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 200).then(() => {
            // Add assertions to check if the token is saved and navigated to the right page
            cy.url().should('include', '/movies'); // Change to the expected URL
        });
    });

    it('should display an error message on login failure', () => {
        cy.get('input[name="email"]').type('wrong@example.com');
        cy.get('input[name="password"]').type('wrongPassword');

        cy.intercept('POST', `${Cypress.env('REACT_APP_BACKEND_API')}/sign-in`, {
            statusCode: 401,
            body: { message: 'Invalid credentials' },
        }).as('loginRequest');

        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        cy.contains('Invalid Credentials. Please try again.').should('be.visible');
    });
});
