import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (imageData: string, cropType: string) => void;
  isLoading: boolean;
}

const cropTypes = [
  'Tomato',
  'Potato',
  'Pepper',
  'Cucumber',
  'Wheat',
  'Rice',
  'Corn',
  'Bean',
  'Other'
];

export default function ImageUpload({ onImageSelect, isLoading }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (previewUrl) {
      onImageSelect(previewUrl, selectedCrop);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 w-full max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-xl">
          <Camera className="w-6 h-6 text-emerald-700" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Upload Crop Image</h2>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Select Crop Type
        </label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full px-5 py-3.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-base font-medium text-slate-700 bg-slate-50"
          disabled={isLoading}
        >
          {cropTypes.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      {!previewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-3 border-dashed border-slate-300 rounded-2xl p-16 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 group"
        >
          <Upload className="w-20 h-20 text-slate-400 group-hover:text-emerald-600 mx-auto mb-5 transition-colors duration-300" />
          <p className="text-xl font-semibold text-slate-700 mb-3">
            Click to upload crop image
          </p>
          <p className="text-sm text-slate-500 font-medium">
            Supports JPG, PNG (Max 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 shadow-md">
            <img
              src={previewUrl}
              alt="Crop preview"
              className="w-full h-80 object-cover"
            />
            <button
              onClick={handleClear}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-xl transition-all hover:scale-105"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </span>
            ) : (
              'Analyze Crop'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
