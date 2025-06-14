
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lat, lng } = await req.json()
    const openWeatherApiKey = Deno.env.get('OPENWEATHER_API_KEY')

    if (!openWeatherApiKey) {
      console.error('OPENWEATHER_API_KEY is not set in Supabase secrets');
      throw new Error('Weather API key is not configured.')
    }
    
    if (lat === undefined || lng === undefined) {
      return new Response(JSON.stringify({ error: 'Latitude and longitude are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherApiKey}&units=metric&lang=sv`
    )

    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.text();
      console.error('OpenWeatherMap API error:', errorData);
      throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`);
    }

    const weatherData = await weatherResponse.json()

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in get-weather function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

