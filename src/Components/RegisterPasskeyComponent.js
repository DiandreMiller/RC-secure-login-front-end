import React, { useState } from "react";
import RedCanary from '../Images/Red-Canary-We-got-you.jpg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { base64ToArrayBuffer } from '../utils/arrayBufferUtils';
import axios from 'axios';

const RegisterPasskeyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const { userId, email, identifier } = location.state || {};

  const registerPasskey = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/register-passkey`, { userId, identifier });
      const publicKeyCredentialCreationOptions = response.data;

      const challengeBuffer = base64ToArrayBuffer(publicKeyCredentialCreationOptions.challenge);
      publicKeyCredentialCreationOptions.challenge = challengeBuffer;
      publicKeyCredentialCreationOptions.user.id = new TextEncoder().encode(userId);

      let credential = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
      const webauthnid = credential.id; 
      const webauthnpublickey = credential.rawId;

      await axios.post(`${process.env.REACT_APP_BACKEND_API}/verify-passkey`, {
        credential,
        email,
        userId,
        identifier,
        webauthnid,
        webauthnpublickey
      });

      console.log('Passkey registration successful:', { webauthnid, webauthnpublickey });
      navigate('/movies');
    } catch (error) {
      console.error('Error during passkey registration:', error);
      setError('Failed to register passkey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (userId && email && identifier) {
      setLoading(true);
      registerPasskey();
    }
  }, [userId, email, identifier]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center pt-16">
        <img src={RedCanary} alt="Red Canary" className="w-48 mb-6" />
        <h1 className="text-4xl font-bold">Register Your Passkey</h1>
        <p className="text-lg text-red-500 mt-2">Enhance Your Security</p>
      </header>

      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-12">
        <section className="max-w-3xl mb-12">
          <h2 className="text-3xl font-semibold mb-6">Secure Your Account</h2>
          <p className="text-lg">
            Registering a passkey adds an extra layer of security to your account.
            Follow the steps below to set up your passkey.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p>Loading...</p>}
        </section>

        <section className="mb-16 flex space-x-4">
          <Link to='/'>
            <button className="bg-red-500 hover:bg-red-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-40">
              Back to Home
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default RegisterPasskeyComponent;
