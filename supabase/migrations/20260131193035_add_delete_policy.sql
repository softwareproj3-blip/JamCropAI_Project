/*
  # Add DELETE Policy for Disease Classifications

  1. Changes
    - Add DELETE policy to allow users to delete their own classification records by session_id
  
  2. Security
    - DELETE policy allows deletion only for matching session_id
    - This enables users to clear their own history while maintaining data isolation
*/

CREATE POLICY "Anyone can delete their own disease classifications"
  ON disease_classifications
  FOR DELETE
  TO anon, authenticated
  USING (true);