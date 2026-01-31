/*
  # Fix Security Policies and Remove Unused Index

  1. Changes
    - Drop unused `idx_disease_classifications_crop_type` index
    - Drop overly permissive RLS policies that use `USING (true)` or `WITH CHECK (true)`
    - Create new restrictive RLS policies that require service role access
    - This ensures all data access goes through the edge function, which handles session validation
  
  2. Security
    - Remove policies that bypass RLS (always true conditions)
    - Restrict direct database access to service role only
    - Edge function uses service role and validates session_id before operations
    - Anonymous users must use the edge function API, cannot directly access database
  
  3. Performance
    - Remove unused index on crop_type to reduce storage and maintenance overhead
    - Keep essential indexes on created_at and session_id for edge function queries
*/

-- Drop the unused crop_type index
DROP INDEX IF EXISTS idx_disease_classifications_crop_type;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view disease classifications" ON disease_classifications;
DROP POLICY IF EXISTS "Anyone can insert disease classifications" ON disease_classifications;
DROP POLICY IF EXISTS "Anyone can delete their own disease classifications" ON disease_classifications;

-- Create restrictive policies that only allow service role access
-- This forces all access to go through the edge function which validates sessions

CREATE POLICY "Service role can select all records"
  ON disease_classifications
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert records"
  ON disease_classifications
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can delete records"
  ON disease_classifications
  FOR DELETE
  TO service_role
  USING (true);

-- Note: Anonymous and authenticated users have NO direct database access
-- All operations must go through the edge function which:
-- 1. Validates the session_id
-- 2. Enforces rate limiting
-- 3. Sanitizes inputs
-- 4. Uses service_role to bypass RLS for validated operations