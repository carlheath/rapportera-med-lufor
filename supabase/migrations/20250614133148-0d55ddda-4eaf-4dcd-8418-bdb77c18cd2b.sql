
-- Ta bort den föregående policyn för att undvika konflikter
DROP POLICY IF EXISTS "Allow public read-only access to reports" ON public.reports;

-- Ta bort den gamla policyn som var specifik för inloggade användare
DROP POLICY IF EXISTS "Allow authenticated read access to reports" ON public.reports;

-- Skapa en ny, enkel policy som tillåter alla att läsa från reports-tabellen
CREATE POLICY "Allow read access for all users"
ON public.reports
FOR SELECT
USING (true);
