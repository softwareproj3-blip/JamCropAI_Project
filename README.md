# CropCare AI - Crop Disease Detection System

A professional, farmer-friendly web application that uses AI to detect crop diseases and provide actionable recommendations.

## Features

### Core Functionality
- **Image Upload**: Easy-to-use interface for uploading crop images
- **Crop Selection**: Support for multiple crop types (Tomato, Potato, Pepper, Cucumber, Wheat, Rice, Corn, Bean)
- **AI Disease Detection**: Intelligent classification of various crop diseases with crop-specific weighting
- **Confidence Levels**: Clear visualization of detection accuracy with color-coded progress bars
- **Severity Indicators**: Color-coded severity levels (Low, Medium, High, Critical)

### Detailed Analysis
- **Possible Causes**: Comprehensive list of potential causes for detected diseases
- **Treatment Recommendations**: Detailed, actionable steps for disease management
- **Educational Resources**: Links to university extension programs and agricultural resources

### History & Navigation
- **Classification History**: View all past crop disease scans with quick access
- **Easy Navigation**: Switch between new scans and history with intuitive navigation buttons
- **Persistent Storage**: All classifications stored securely in the database

### Security Features
- **Input Validation**: Server-side validation of image data format and size
- **Rate Limiting**: Session-based rate limiting (10 requests per 5 minutes)
- **Data Sanitization**: Automatic sanitization of crop type inputs
- **IP Tracking**: Hashed IP addresses for security monitoring
- **Session Management**: Unique session IDs for tracking and security

## Disease Detection

The system can identify multiple crop diseases including:
- Early Blight
- Late Blight
- Leaf Spot
- Powdery Mildew
- Bacterial Wilt
- Mosaic Virus
- Healthy crops

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase Edge Functions
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React

## Getting Started

The application requires Supabase environment variables to be configured. The system will store classification results and provide instant disease detection.

## Usage

### Scanning for Diseases
1. Click "New Scan" in the navigation
2. Select your crop type from the dropdown
3. Upload a clear photo of your crop
4. Click "Analyze Crop" to get instant results
5. Review the comprehensive analysis including:
   - Disease name and severity
   - Confidence level with visual indicator
   - Possible causes of the disease
   - Recommended treatment actions
   - Links to educational resources

### Viewing History
1. Click "History" in the navigation
2. Browse through all past classifications
3. Click on any entry to view full details
4. Use "New Scan" to return to scanning mode

## Security & Best Practices

- **Input Validation**: All image uploads are validated for format and size

## Demo

https://github.com/user-attachments/assets/57240cd0-4b60-4c37-a31c-4cfc53b3d6bf


