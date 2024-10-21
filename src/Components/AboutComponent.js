import RedCanary from "../Images/Red-Canary-We-got-you.jpg";

const AboutComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Discover who we are and why we’re committed to protecting you.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
          {/* Image Section */}
          <div className="flex-shrink-0 lg:w-1/3 mb-8 lg:mb-0">
            <img
              src={RedCanary}
              alt="Our Team"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 text-lg">
            <section className="mb-10">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Red Canary was founded with a simple yet powerful mission: to
                provide organizations with industry-leading cybersecurity
                solutions. We believe that protecting companies from cyber
                threats is not just a business—it’s our responsibility.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are on a mission to stop cyber attacks before they start.
                With a team of dedicated experts, innovative technology, and a
                commitment to transparency, we help protect organizations from
                the growing wave of cyber threats in today’s digital age.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Our Values
              </h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Integrity and Trust</li>
                <li>Innovation in Technology</li>
                <li>Customer Commitment</li>
                <li>Transparency and Accountability</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutComponent;
