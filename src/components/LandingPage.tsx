import { Upload, History, Shield, Zap, LineChart, BookOpen, ArrowRight, Leaf } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-3 sm:p-4 rounded-2xl shadow-lg">
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
              Jam<span className="text-emerald-600">Crop</span> <span className="text-slate-600">AI</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 font-medium max-w-3xl mx-auto px-4">
            Optimize Yuh Land, Elevate Yuh Brand
          </p>
          <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Upload images of your crops and receive instant, accurate disease classifications with actionable recommendations to protect your harvest
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6">
              <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-blue-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Upload & Analyze</h3>
            <p className="text-slate-600 leading-relaxed">
              Simply upload a clear image of your crop. Our AI-powered system analyzes the image instantly to detect potential diseases.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Instant Results</h3>
            <p className="text-slate-600 leading-relaxed">
              Get accurate disease classification results in seconds, complete with confidence scores and severity levels.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 sm:p-4 rounded-xl w-fit mb-4 sm:mb-6">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Expert Recommendations</h3>
            <p className="text-slate-600 leading-relaxed">
              Receive detailed treatment recommendations, prevention strategies, and access to educational resources.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl mb-12 sm:mb-16 md:mb-20 text-white">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white/10 p-2 sm:p-3 rounded-xl">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Capture or Upload</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Take a clear, well-lit photo of the affected plant area. Ensure the image shows the disease symptoms clearly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Select Crop Type</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Choose the type of crop from our supported list. This helps our AI provide more accurate results.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Analyze</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Click the analyze button and our AI will process the image to identify any diseases present.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Review Results</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Get detailed information about the detected disease, including confidence level and severity assessment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Take Action</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Follow the recommended treatment steps, prevention measures, and explore additional resources.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                  6
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Track History</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Access your classification history anytime to monitor patterns and track treatment progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 sm:p-3 rounded-xl">
                <LineChart className="w-6 h-6 sm:w-7 sm:h-7 text-purple-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Accurate Analysis</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our advanced AI model has been trained on thousands of crop disease images, providing reliable classifications with confidence scores to help you make informed decisions.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>High accuracy disease detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Confidence level indicators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Severity assessment</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-3 rounded-xl">
                <History className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Comprehensive Tracking</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Keep a complete record of all your crop disease scans. Sort, filter, and revisit past classifications to monitor trends and evaluate treatment effectiveness.
            </p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Complete classification history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Sort by date, confidence, or severity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Easy access to past results</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">Ready to Protect Your Crops?</h2>
          <p className="text-emerald-50 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Start using JamCrop AI today and get instant insights into your crop health
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-slate-50 text-emerald-700 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Scanning Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
