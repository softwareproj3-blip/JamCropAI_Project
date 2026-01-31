export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Resource {
  title: string;
  url: string;
}

export interface ClassificationResult {
  id: string;
  disease: string;
  confidence: number;
  severity: Severity;
  recommendations: string[];
  causes: string[];
  resources: Resource[];
  cropType: string;
  timestamp: string;
}

export interface ClassificationRequest {
  imageData: string;
  cropType?: string;
}
