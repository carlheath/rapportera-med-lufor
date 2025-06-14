
ALTER TABLE public.reports
ADD COLUMN external_link_url TEXT;

COMMENT ON COLUMN public.reports.external_link_url IS 'URL to an external resource like a YouTube video or sound file.';
