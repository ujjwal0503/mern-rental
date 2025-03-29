import React from 'react';

export default function About() {
  return (
    <div className="bg-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">About <span className='text-green-600'> Farm</span>
          <span className='text-gray-900'>Tech</span></h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your trusted platform for renting and purchasing high-quality agricultural equipment.
            We bridge the gap between farmers and modern machinery, making farming more efficient and cost-effective.
          </p>
        </div>

        {/* Highlighted sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Wide Range of Equipment</h3>
            <p className="text-gray-600">
              From tractors to specialized farming tools, we provide access to top-quality equipment for every need.
              Our inventory includes the latest models from trusted manufacturers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Affordable & Flexible</h3>
            <p className="text-gray-600">
              Rent equipment at competitive prices with flexible durations that suit your farming schedule.
              Our transparent pricing ensures you get the best value for your investment.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
            <h3 className="text-2xl font-semibold text-green-700 mb-3">Trusted by Farmers</h3>
            <p className="text-gray-600">
              Join a growing community of farmers who rely on our platform for hassle-free equipment rentals and purchases.
              Over 5,000 successful transactions completed across the country.
            </p>
          </div>
        </div>

        {/* New sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Why Choose Farm Tech?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Sustainable Farming</h3>
              <p className="text-gray-600">
                We promote sustainable agricultural practices by providing access to modern, 
                fuel-efficient equipment that reduces environmental impact while maximizing yield.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our team of agricultural experts can help you select the right equipment for your specific needs,
                ensuring optimal performance and productivity for your farm.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Maintenance Support</h3>
              <p className="text-gray-600">
                All equipment comes with maintenance support, including regular servicing and
                emergency repairs to minimize downtime during critical farming operations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Tech Integration</h3>
              <p className="text-gray-600">
                Our platform seamlessly integrates with popular farm management software,
                allowing you to track equipment usage, costs, and plan future requirements efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <a href="/search" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
            Explore Equipment
          </a>
          <p className="mt-4 text-gray-600">
            Join over 10,000 farmers nationwide who trust Farm Tech for their equipment needs.
          </p>
        </div>
      </div>
    </div>
  );
}