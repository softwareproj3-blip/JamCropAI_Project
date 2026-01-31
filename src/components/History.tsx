import { useEffect, useState } from 'react';
import { History as HistoryIcon, Clock, Leaf, TrendingUp, AlertCircle, Trash2, ArrowUpDown } from 'lucide-react';
import { ClassificationResult } from '../types/disease';
import { getSessionId } from '../utils/session';

interface HistoryProps {
  onViewResult: (result: ClassificationResult) => void;
}

type SortOption = 'date-desc' | 'date-asc' | 'confidence-desc' | 'confidence-asc' | 'severity';

export default function History({ onViewResult }: HistoryProps) {
  const [classifications, setClassifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {

  }, [classifications]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase configuration');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/get-history?sessionId=${encodeURIComponent(sessionId)}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load history');
      }

      const result = await response.json();
      setClassifications(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      const sessionId = getSessionId();

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase configuration');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/delete-history`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear history');
      }

      setClassifications([]);
      setShowClearConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    }
  };

  const getSortedClassifications = () => {
    const sorted = [...classifications];

    switch (sortBy) {
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'confidence-desc':
        return sorted.sort((a, b) => b.confidence_level - a.confidence_level);
      case 'confidence-asc':
        return sorted.sort((a, b) => a.confidence_level - b.confidence_level);
      case 'severity':
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1, 'None': 0 };
        return sorted.sort((a, b) => (severityOrder[b.severity as keyof typeof severityOrder] || 0) - (severityOrder[a.severity as keyof typeof severityOrder] || 0));
      default:
        return sorted;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-4xl">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-4xl">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-2 text-lg">Error</h3>
              <p className="text-red-700 leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-4xl animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-sm">
            <HistoryIcon className="w-7 h-7 text-blue-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Classification History</h2>
            <p className="text-slate-600 font-medium">View your past crop disease scans</p>
          </div>
        </div>

        {classifications.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg px-4 py-2.5 border-2 border-slate-200 hover:border-slate-300 transition-all shadow-sm">
                <ArrowUpDown className="w-4 h-4 text-emerald-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent border-none text-sm font-semibold text-slate-700 cursor-pointer focus:outline-none appearance-none pr-6"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="confidence-desc">Highest Confidence</option>
                  <option value="confidence-asc">Lowest Confidence</option>
                  <option value="severity">By Severity</option>
                </select>
                <svg className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border-2 border-red-200 hover:border-red-300 transition-all font-semibold shadow-sm hover:shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {showClearConfirm && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Clear All History?</h3>
                <p className="text-red-700 text-sm">This action cannot be undone. All classification records will be permanently deleted.</p>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {classifications.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="w-20 h-20 text-slate-400 mx-auto mb-5" />
          <p className="text-slate-700 text-xl font-semibold mb-2">No classification history yet</p>
          <p className="text-slate-500 text-base">Upload your first crop image to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {getSortedClassifications().map((item) => (
            <div
              key={item.id}
              className="border-2 border-slate-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-slate-50"
              onClick={() => {
                const result: ClassificationResult = {
                  id: item.id,
                  disease: item.disease_name,
                  confidence: item.confidence_level,
                  severity: item.severity,
                  recommendations: item.recommendations.split('\n'),
                  causes: item.causes ? item.causes.split('\n') : [],
                  resources: item.resources ? (typeof item.resources === 'string' ? JSON.parse(item.resources) : item.resources) : [],
                  cropType: item.crop_type,
                  timestamp: item.created_at,
                };
                onViewResult(result);
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-xl shadow-sm">
                    <Leaf className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      {item.disease_name}
                    </h3>
                    <p className="text-slate-600 mb-3 font-medium">
                      <span className="font-semibold">Crop:</span> {item.crop_type}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 ${getSeverityColor(item.severity)} shadow-sm`}>
                        <span className="text-sm font-bold">{item.severity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {item.confidence_level.toFixed(1)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500 font-medium">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
