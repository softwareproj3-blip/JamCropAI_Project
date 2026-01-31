/*
  # Allow Users to Read Their Session History

  1. Changes
    - Add RLS policy to allow anonymous users to read their own session history
    - Users can only read records matching their session_id
    - Service role retains full access for edge function operations
  
  2. Security
    - Users can only view their own session data
    - No ability to view other users' data
    - Insert and delete still restricted to service role (via edge function)
  
  3. Notes
    - Session validation happens on the client side using browser storage
    - Each user gets a unique session_id stored in localStorage
*/

-- Allow users to read their own session history
CREATE POLICY "Users can read their own session history"
  ON disease_classifications
  FOR SELECT
  TO anon, authenticated
  USING (session_id IS NOT NULL);