/**
 * Landing Page Example with 3D Hero Section
 * 
 * This is an example landing page demonstrating the optional 3D hero section.
 * The 3D hero is restricted to the landing page only (/) as per requirements.
 * 
 * Requirements:
 * - 13.1: Enable 3D effects only on landing page
 * - 13.7: Use single canvas element maximum
 */

import { Hero3D, Hero3DContent } from '@/components/hero/hero-3d';

export default function LandingExamplePage() {
  return (
    <main className="min-h-screen">
      {/* 3D Hero Section */}
      <Hero3D>
        <Hero3DContent className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Dayflow HRMS
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Modern HR management with intelligent automation
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
        </Hero3DContent>
      </Hero3D>

      {/* Additional content sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Attendance Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automated attendance management with real-time tracking
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Leave Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Streamlined leave requests and approval workflows
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Payroll Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Accurate and timely payroll calculations
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
