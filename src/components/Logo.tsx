import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <div
      className={`bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Leaf className="text-white" style={{ width: size * 0.6, height: size * 0.6 }} />
    </div>
  );
}
