import React from "react";
import RedCanary from '../Images/Red-Canary-We-got-you.jpg';
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex flex-col items-center justify-center pt-16">
        <img src={RedCanary} alt="Red Canary" className="w-48 mb-6" />
        <h1 className="text-4xl font-bold">Welcome to Red Canary</h1>
        <p className="text-lg text-red-500 mt-2">We Got You</p>
      </header>

      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-12">
        <section className="max-w-3xl mb-12">
          <h2 className="text-3xl font-semibold mb-6">About Red Canary</h2>
          <p className="text-lg">
            Red Canary is dedicated to protecting organizations against cyber threats with
            industry-leading security solutions. Join us in our mission to stop cyber attacks.
          </p>
        </section>

        <section className="mb-16 flex space-x-4">
          <button className="bg-red-500 hover:bg-red-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-40">
            Learn More
          </button>

          <Link to='/login-signup'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-40">
                Login
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomeComponent;
