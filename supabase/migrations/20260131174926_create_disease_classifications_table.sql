/*
  # Create Disease Classifications Table

  1. New Tables
    - `disease_classifications`
      - `id` (uuid, primary key) - Unique identifier for each classification
      - `crop_type` (text) - Type of crop being analyzed
      - `disease_name` (text) - Name of detected disease
      - `confidence_level` (numeric) - Confidence percentage (0-100)
      - `recommendations` (text) - Recommended actions for treatment
      - `severity` (text) - Disease severity level (Low, Medium, High, Critical)
      - `image_data` (text, optional) - Base64 encoded image data
      - `created_at` (timestamptz) - Timestamp of classification
  
  2. Security
    - Enable RLS on `disease_classifications` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS disease_classifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_type text NOT NULL,
  disease_name text NOT NULL,
  confidence_level numeric NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 100),
  recommendations text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  image_data text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE disease_classifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view disease classifications"
  ON disease_classifications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert disease classifications"
  ON disease_classifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);