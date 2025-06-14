
-- Attempt to enable the PostGIS extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Create a table for drone reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  report_mode TEXT CHECK (report_mode IN ('quick', 'detailed')),
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  accuracy NUMERIC,
  photo_url TEXT,
  video_url TEXT,
  description TEXT,
  details JSONB,
  contact_info JSONB,
  weather_data JSONB,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'resolved', 'archived', 'rejected')),
  operator_notes TEXT, -- Notes added by an operator
  reported_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- If a logged-in user reports
  raw_form_data JSONB -- Store the raw form submission for auditing/backup
);

-- Add comments to columns for better understanding
COMMENT ON COLUMN public.reports.report_mode IS 'Mode of the report: quick or detailed';
COMMENT ON COLUMN public.reports.latitude IS 'Latitude of the reported incident';
COMMENT ON COLUMN public.reports.longitude IS 'Longitude of the reported incident';
COMMENT ON COLUMN public.reports.accuracy IS 'Accuracy of the GPS location in meters';
COMMENT ON COLUMN public.reports.photo_url IS 'URL to the stored photo, if any';
COMMENT ON COLUMN public.reports.video_url IS 'URL to the stored video, if any';
COMMENT ON COLUMN public.reports.description IS 'Reporter''s description of the incident';
COMMENT ON COLUMN public.reports.details IS 'Additional details from the detailed report form';
COMMENT ON COLUMN public.reports.contact_info IS 'Contact information of the reporter (handle with GDPR care)';
COMMENT ON COLUMN public.reports.weather_data IS 'Weather data at the time of the report';
COMMENT ON COLUMN public.reports.status IS 'Current status of the report (new, under_review, resolved, archived, rejected)';
COMMENT ON COLUMN public.reports.operator_notes IS 'Internal notes made by an operator reviewing the report';
COMMENT ON COLUMN public.reports.reported_by_user_id IS 'ID of the user who submitted the report, if they were logged in';
COMMENT ON COLUMN public.reports.raw_form_data IS 'Complete raw data submitted by the form for auditing purposes';

-- Enable Row Level Security (RLS)
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert reports (as per current app functionality)
CREATE POLICY "Allow anonymous insert access to reports"
  ON public.reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (operators) to select all reports
CREATE POLICY "Allow authenticated read access to reports"
  ON public.reports
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (operators) to update reports
CREATE POLICY "Allow authenticated update access to reports"
  ON public.reports
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (operators) to delete reports
CREATE POLICY "Allow authenticated delete access to reports"
  ON public.reports
  FOR DELETE
  TO authenticated
  USING (true);

-- Create an index on created_at for faster sorting/filtering
CREATE INDEX idx_reports_created_at ON public.reports(created_at DESC);

-- Create an index on status for filtering
CREATE INDEX idx_reports_status ON public.reports(status);

-- Create an index on geographic location for potential spatial queries
-- This uses ST_SetSRID to explicitly set the coordinate system (WGS 84)
CREATE INDEX idx_reports_location_gist ON public.reports USING gist (extensions.ST_SetSRID(extensions.ST_MakePoint(longitude, latitude), 4326));

