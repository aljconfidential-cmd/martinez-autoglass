/*
  # Create Quote Requests Table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key) - Unique identifier
      - `first_name` (text) - Customer's first name
      - `last_name` (text) - Customer's last name
      - `phone` (text) - Customer's phone number
      - `vehicle` (text) - Vehicle information (year, make, model)
      - `service` (text) - Description of service needed
      - `created_at` (timestamptz) - When the request was submitted
      - `status` (text) - Status of the quote (pending, contacted, completed)
  
  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for inserting quote requests (public access for form submissions)
    - Add policy for reading quote requests (authenticated users only - for admin access)
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  vehicle text NOT NULL,
  service text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quote requests (for public form submissions)
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view quote requests (for admin dashboard later)
CREATE POLICY "Authenticated users can view all quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);