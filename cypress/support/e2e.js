// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// This will prevent Cypress from failing the test on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    // You can add conditions here to filter specific errors if needed
    if (err.message.includes("useNavigate() may be used only in the context of a <Router> component.")) {
        return false; // Prevent the error from failing the test
    }
    // Return true for other errors to let Cypress fail the test
    return true;
});
