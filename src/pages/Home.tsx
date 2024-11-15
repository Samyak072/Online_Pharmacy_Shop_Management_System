import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Truck, HeartPulse } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1920"
          alt="Pharmacy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/50" />
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Your Health, Our Priority</h1>
            <p className="text-xl mb-8">
              Get your medicines delivered at your doorstep. Quality healthcare made accessible and affordable.
            </p>
            <Link
              to="/medicines"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-800 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Medicines
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <ShieldCheck className="h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Genuine Medicines</h3>
          <p className="text-gray-600">
            All our medicines are sourced directly from manufacturers ensuring authenticity and quality.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <Truck className="h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Get your medicines delivered within 24-48 hours of placing your order.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <HeartPulse className="h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Healthcare Experts</h3>
          <p className="text-gray-600">
            Our team of healthcare experts is available 24/7 to assist you with your queries.
          </p>
        </div>
      </section>
    </div>
  );
}