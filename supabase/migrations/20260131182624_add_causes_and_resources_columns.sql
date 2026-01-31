/*
  # Add Causes and Resources Columns

  1. Changes
    - Add `causes` column to store disease causes as text
    - Add `resources` column to store educational resource links as JSONB
  
  2. Details
    - Both columns are optional (nullable) to maintain backward compatibility
    - Resources are stored as JSONB array for structured data
    - Existing records will have NULL values for these new columns

  3. Notes
    - Uses IF NOT EXISTS pattern to safely add columns
    - No data migration needed as these are new optional fields
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'disease_classifications' AND column_name = 'causes'
  ) THEN
    ALTER TABLE disease_classifications ADD COLUMN causes text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'disease_classifications' AND column_name = 'resources'
  ) THEN
    ALTER TABLE disease_classifications ADD COLUMN resources jsonb;
  END IF;
END $$;
