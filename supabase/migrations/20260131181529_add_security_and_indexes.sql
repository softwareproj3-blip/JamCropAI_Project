/*
  # Add Security Features and Performance Indexes

  1. Changes
    - Add session_id column for tracking unique sessions (for rate limiting)
    - Add ip_address column for security tracking (hashed)
    - Add indexes for better query performance
    - Add index on created_at for history queries
    - Add index on session_id for rate limiting checks
  
  2. Security
    - Policies remain public for demo purposes but with better tracking
    - Added rate limiting foundation via session tracking
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'disease_classifications' AND column_name = 'session_id'
  ) THEN
    ALTER TABLE disease_classifications ADD COLUMN session_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'disease_classifications' AND column_name = 'ip_hash'
  ) THEN
    ALTER TABLE disease_classifications ADD COLUMN ip_hash text;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_disease_classifications_created_at 
  ON disease_classifications(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_disease_classifications_session_id 
  ON disease_classifications(session_id);

CREATE INDEX IF NOT EXISTS idx_disease_classifications_crop_type 
  ON disease_classifications(crop_type);