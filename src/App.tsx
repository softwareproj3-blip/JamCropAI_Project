import { useState } from 'react';
import { AlertCircle, Camera, History as HistoryIcon, Home } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import History from './components/History';
import LandingPage from './components/LandingPage';
import Logo from './components/Logo';
import { ClassificationResult } from './types/disease';
import { getSessionId } from './utils/session';

type View = 'landing' | 'scan' | 'history' | 'result';

function App() {
  const [view, setView] = useState<View>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  const handleImageSelect = async (imageData: string, cropType: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase configuration');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/classify-crop-disease`;
      const sessionId = getSessionId();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData,
          cropType,
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to classify disease');
      }

      const data: ClassificationResult = await response.json();
      setResult(data);
      setView('result');
      setHistoryRefreshKey(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Classification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setView('scan');
  };

  const handleNewScan = () => {
    setResult(null);
    setError(null);
    setView('scan');
  };

  const handleLogoClick = () => {
    setResult(null);
    setError(null);
    setView('landing');
  };

  const handleViewResult = (historyResult: ClassificationResult) => {
    setResult(historyResult);
    setView('result');
  };

  const handleGetStarted = () => {
    setView('scan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
      {view !== 'landing' && (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Logo size={56} />
                <div className="text-left hidden sm:block">
                  <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    Jam<span className="text-emerald-600">Crop</span> <span className="text-slate-600">AI</span>
                  </h1>
                  <p className="text-xs text-slate-600 font-medium">Optimize Yuh Land, Elevate Yuh Brand</p>
                </div>
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleLogoClick}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    view === 'landing'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </button>
                <button
                  onClick={handleNewScan}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    view === 'scan' && !result
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">New Scan</span>
                </button>
                <button
                  onClick={() => {
                    setView('history');
                    setHistoryRefreshKey(prev => prev + 1);
                  }}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    view === 'history'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <HistoryIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={view !== 'landing' ? 'container mx-auto px-6 py-16' : ''}>
        <div className={view !== 'landing' ? 'flex flex-col items-center justify-center' : ''}>
          {view === 'landing' && (
            <LandingPage onGetStarted={handleGetStarted} />
          )}

          {view === 'scan' && !result && (
            <>
              <div className="text-center mb-12 max-w-3xl">
                <h2 className="text-5xl font-bold text-slate-800 mb-5 tracking-tight leading-tight">
                  Protect Your Crops with AI
                </h2>
                <p className="text-xl text-slate-600 mb-3 leading-relaxed">
                  Upload a photo of your crop to instantly detect diseases and receive expert recommendations
                </p>
                <p className="text-base text-slate-500 leading-relaxed">
                  Fast, accurate, and easy to use - helping farmers make informed decisions
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8 max-w-2xl w-full shadow-sm">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 mb-2 text-lg">Error</h3>
                      <p className="text-red-700 leading-relaxed">{error}</p>
                      <button
                        onClick={() => setError(null)}
                        className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <ImageUpload onImageSelect={handleImageSelect} isLoading={isLoading} />
            </>
          )}

          {view === 'history' && (
            <History key={historyRefreshKey} onViewResult={handleViewResult} />
          )}

          {view === 'result' && result && (
            <ResultsDisplay result={result} onReset={handleReset} />
          )}
        </div>
      </main>

      {view !== 'landing' && (
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size={40} />
                <div>
                  <p className="text-slate-700 font-bold text-base">
                    JamCrop AI
                  </p>
                  <p className="text-xs text-slate-500">
                    Optimize Yuh Land, Elevate Yuh Brand
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-500 max-w-md text-right">
                For educational purposes. Always consult agricultural experts for critical decisions.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
