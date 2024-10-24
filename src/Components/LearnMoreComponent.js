import React from "react";
import { Link } from "react-router-dom";

const LearnMoreComponent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex flex-col items-center justify-center pt-16">
        <h1 className="text-5xl font-extrabold mb-4 text-center">Discover the Red Canary Difference</h1>
        <p className="text-xl text-red-400 mb-2">Your Trusted Cybersecurity Partner</p>
        <p className="text-base text-gray-400 max-w-2xl text-center">
          Explore how Red Canary takes cybersecurity to the next level with cutting-edge technology and an expert team dedicated to protecting your organization.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-12">
        
        {/* Red Canary Difference */}
        <section className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-6">The Red Canary Difference</h2>
          <p className="text-lg leading-relaxed mb-4">
            Red Canary’s proactive approach to cybersecurity ensures that your organization is protected 24/7. Our expert team continuously monitors for threats, providing real-time insights and rapid response to incidents.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            We don’t just stop attacks; we help you recover from them and prevent future threats. With Red Canary, your security is always one step ahead.
          </p>
        </section>

        {/* Key Features */}
        <section className="max-w-3xl mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-6">Key Features</h2>
          <ul className="text-lg list-disc list-inside mb-4 leading-relaxed text-left">
            <li>24/7 threat detection and continuous monitoring.</li>
            <li>Rapid incident response from a team of cybersecurity experts.</li>
            <li>Detailed reporting and analytics to provide actionable insights.</li>
            <li>Customized security solutions tailored to your organization’s needs.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="mb-16 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to='/'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-48">
              Back to Home
            </button>
          </Link>

          <Link to='/'>
            <button className="bg-red-500 hover:bg-red-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-48">
              Contact Us
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default LearnMoreComponent;
