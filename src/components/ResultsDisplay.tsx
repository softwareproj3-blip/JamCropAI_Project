import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Leaf, Activity, Calendar, HelpCircle, ExternalLink } from 'lucide-react';
import { ClassificationResult } from '../types/disease';

interface ResultsDisplayProps {
  result: ClassificationResult;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'Low':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'Medium':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'High':
        return {
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'Critical':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="w-5 h-5" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const severityConfig = getSeverityConfig(result.severity);
  const confidenceColor = result.confidence >= 80 ? 'text-green-600' : result.confidence >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-4xl animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`${severityConfig.bgColor} p-3 rounded-xl border-2 ${severityConfig.borderColor} shadow-sm`}>
            <Activity className="w-7 h-7 text-slate-700" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Analysis Results</h2>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          New Scan
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-700 text-base">Crop Type</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">{result.cropType}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-700 text-base">Scan Date</h3>
          </div>
          <p className="text-lg font-semibold text-slate-800">
            {new Date(result.timestamp).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className={`${severityConfig.bgColor} rounded-xl p-7 mb-8 border-2 ${severityConfig.borderColor} shadow-sm`}>
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {severityConfig.icon}
              <h3 className="font-semibold text-slate-700 text-lg">Detected Condition</h3>
            </div>
            <p className="text-4xl font-bold text-slate-800 mb-4">{result.disease}</p>
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 ${severityConfig.color} shadow-sm`}>
              <span className="font-bold text-base">Severity: {result.severity}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-slate-700 text-base">Confidence Level</span>
            <span className={`text-3xl font-bold ${confidenceColor}`}>
              {result.confidence.toFixed(1)}%
            </span>
          </div>
          <div className="bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-500 ${
                result.confidence >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : result.confidence >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>
      </div>

      {result.causes && result.causes.length > 0 && (
        <div className="bg-amber-50 rounded-xl p-7 mb-8 border-2 border-amber-300 shadow-sm">
          <h3 className="font-bold text-2xl text-slate-800 mb-5 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-amber-600" />
            Possible Causes
          </h3>
          <ul className="space-y-3">
            {result.causes.map((cause, index) => (
              <li
                key={index}
                className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-amber-200 shadow-sm"
              >
                <span className="flex-shrink-0 w-2.5 h-2.5 bg-amber-600 rounded-full mt-2"></span>
                <span className="text-slate-700 font-medium flex-1 leading-relaxed">{cause}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-7 mb-8 border-2 border-blue-300 shadow-sm">
        <h3 className="font-bold text-2xl text-slate-800 mb-5 flex items-center gap-3">
          <AlertCircle className="w-7 h-7 text-blue-600" />
          Recommended Actions
        </h3>
        <ul className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-blue-200 shadow-sm"
            >
              <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </span>
              <span className="text-slate-700 font-medium flex-1 leading-relaxed">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.resources && result.resources.length > 0 && (
        <div className="bg-emerald-50 rounded-xl p-7 border-2 border-emerald-300 shadow-sm">
          <h3 className="font-bold text-2xl text-slate-800 mb-5 flex items-center gap-3">
            <ExternalLink className="w-7 h-7 text-emerald-600" />
            Purchase Recommended Items
          </h3>
          <div className="space-y-3">
            {result.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-5 rounded-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 group"
              >
                <ExternalLink className="w-5 h-5 text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-slate-700 font-semibold flex-1 group-hover:text-emerald-700 leading-relaxed">
                  {resource.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
