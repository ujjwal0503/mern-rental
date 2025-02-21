import React from 'react';

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-slate-800">
        About <span className='text-green-500'>Farm</span>
              <span className='text-slate-700'>Tech</span>
      </h1>
      <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
        Your trusted platform for renting and purchasing high-quality agricultural equipment. 
        We bridge the gap between farmers and modern machinery, making farming more efficient and cost-effective.
      </p>

      {/* Highlighted sections */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-xl border border-green-300">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Wide Range of Equipment</h2>
          <p className="text-slate-600">
            From tractors to specialized farming tools, we provide access to top-quality equipment for every need.
          </p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-xl border border-green-300">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Affordable & Flexible</h2>
          <p className="text-slate-600">
            Rent equipment at competitive prices with flexible durations that suit your farming schedule.
          </p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-xl border border-green-300">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Trusted by Farmers</h2>
          <p className="text-slate-600">
            Join a growing community of farmers who rely on our platform for hassle-free equipment rentals and purchases.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-10">
        <a 
          href="/search" 
          className="px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-full shadow-md hover:bg-green-700 transition"
        >
          Explore Equipment
        </a>
      </div>
    </div>
  );
}
