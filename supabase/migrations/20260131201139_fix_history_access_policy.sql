/*
  # Fix History Access Policy

  1. Changes
    - Drop the overly permissive policy that allows reading any record with a session_id
    - Keep access restricted to service role only
    - History data will be accessed through a dedicated edge function
  
  2. Security
    - All database access goes through edge functions
    - Edge functions validate session_id before returning data
    - No direct database access from client
*/

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can read their own session history" ON disease_classifications;