
-- Aktivera Row Level Security (RLS) för tabellen 'reports'
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Skapa en policy som tillåter alla att läsa data från 'reports'-tabellen
CREATE POLICY "Allow public read-only access to reports"
ON public.reports
FOR SELECT
USING (true);
