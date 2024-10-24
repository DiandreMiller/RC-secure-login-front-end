# Super Secure Login System (Frontend)

This repository contains the frontend of a highly secure login and sign-up system. It provides a modern, user-friendly interface with robust security features such as passkey authentication, account lockout, and email alerts for suspicious login activities.

## Features

- **Passkeys Support**: Utilizes passkey authentication for a passwordless and more secure login experience.
- **Multiple Browser Login Alerts**: Users are notified via email if their account is accessed from a new browser.
- **Account Lockout**: After multiple failed login attempts, the account is locked for 6 hours to protect against brute-force attacks.
- **Form Handling and Validation**: Managed using Formik with client-side validation for a seamless user experience.
- **Cross-Site Scripting (XSS) Protection**: Input fields are sanitized with DOMPurify to prevent XSS attacks.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Formik**: For form handling and validation.
- **DOMPurify**: To sanitize HTML and protect against XSS.
- **Cookies**: Used for session management and storing authentication tokens.
- **Cypress**: For end-to-end testing.
- **Jest**: For unit testing React components.

## Prerequisites

- Node.js (version 18.20.4 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RC-Challenge/RC-secure-login-front-end

## Installation

2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables by creating a .env file in the root directory:

REACT_APP_BACKEND_API=your_backend_api_url


4. Run the application:

bash
Copy code
npm start
The application will run at http://localhost:3000.

## Deployment

The frontend is deployed using Netlify. You can access the live application here:

[**Deployed Front-End**](https://rc-secure-login-front-end.netlify.app/)

## Documentation

For more information about Formik, visit the official documentation:

[**Formik Documentation**](https://formik.org/docs/overview)
