import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginAndSignUpComponent from '../Components/LoginAndSignUpComponent';
import { AuthContext } from '../authenthication/AuthContext';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock AuthContext
const mockLogin = jest.fn();

const MockAuthProvider = ({ children }) => (
    <AuthContext.Provider value={{ login: mockLogin }}>
        {children}
    </AuthContext.Provider>
);

describe('LoginAndSignUpComponent', () => {
    test('renders LoginAndSignUpComponent', () => {
        render(
            <MockAuthProvider>
                <LoginAndSignUpComponent />
            </MockAuthProvider>
        );
        // You can add additional assertions to check for presence of components
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test('should render the login form by default', () => {
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.queryByPlaceholderText(/enter your username/i)).not.toBeInTheDocument();
    });

    test('should toggle to sign-up form', () => {
        fireEvent.click(screen.getByText(/sign up/i));
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    });

    test('should submit the sign-up form successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'User created successfully' } });

        fireEvent.click(screen.getByText(/sign up/i));
        fireEvent.change(screen.getByPlaceholderText(/enter your username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/enter your phone number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText(/date of birth/i), { target: { value: '2000-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_API}/sign-up`,
                {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                    phoneNumber: '1234567890',
                    dateOfBirth: '2000-01-01',
                }
            );
        });
    });

    test('should submit the login form successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { token: 'mockToken', expiresIn: 3600 } });

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('mockToken');
        });
    });

    test('should display an error message on login failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

        fireEvent.change(screen.getByPlaceholderText(/enter your email/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'wrongPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });
});
