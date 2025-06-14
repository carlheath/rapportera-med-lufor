
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { TFunction } from 'i18next';
import React from 'react';

// This mirrors the interface in Index.tsx
interface ReportFormData {
  location: { lat: number, lng: number, accuracy: number } | null;
  mediaFiles: File[];
  description: string;
  droneSize: string;
  droneColor: string;
  flightPattern: string;
  duration: string;
  numberOfDrones: string;
  contactInfo: string;
  urgencyLevel: string;
  external_link_url: string;
  batteryLevel: number | null;
  reportMode: 'quick' | 'detailed';
  deviceInfo: any;
  [key: string]: any;
}

export const submitReport = async (formData: ReportFormData, t: TFunction) => {
  console.log("Form data received for submission:", formData);

  let weatherData = null;
  if (formData.location) {
    try {
      console.log("Fetching weather data for submission...");
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: { lat: formData.location.lat, lng: formData.location.lng },
      });
      if (error) {
        console.warn("Could not fetch weather data on submission:", error.message);
      } else {
        weatherData = data;
        console.log("Fetched weather data on submission:", weatherData);
      }
    } catch (e: any) {
      console.warn("Exception while fetching weather data on submission:", e.message);
    }
  }


  // TODO: Implement file uploads to Supabase Storage.
  // This will be a follow-up step. For now, we pass what we have.

  const details = {
    droneSize: formData.droneSize,
    droneColor: formData.droneColor,
    flightPattern: formData.flightPattern,
    duration: formData.duration,
    numberOfDrones: formData.numberOfDrones,
    urgencyLevel: formData.urgencyLevel,
  };

  const reportToInsert = {
    report_mode: formData.reportMode,
    latitude: formData.location?.lat,
    longitude: formData.location?.lng,
    accuracy: formData.location?.accuracy,
    photo_url: null, // Placeholder for file upload result
    video_url: null, // Placeholder for file upload result
    description: formData.description,
    details: details,
    contact_info: { contact: formData.contactInfo },
    weather_data: weatherData, // Use fetched weather data
    raw_form_data: formData,
    external_link_url: formData.external_link_url || null,
  };

  console.log("Data to insert into Supabase:", reportToInsert);

  // Validate required fields
  if (!reportToInsert.latitude || !reportToInsert.longitude) {
    toast.error(t('toasts.reportError'), {
      description: t('toasts.reportErrorLocationMissing'),
      icon: <AlertTriangle className="w-4 h-4" />,
    });
    return { success: false };
  }
  
  const { error } = await supabase.from('reports').insert([reportToInsert]);

  if (error) {
    console.error("Error inserting report:", error);
    toast.error(t('toasts.reportError'), {
      description: t('toasts.genericError', { message: error.message }),
      icon: <AlertTriangle className="w-4 h-4" />,
    });
    return { success: false };
  } else {
    toast.success(t('toasts.reportSuccess'), {
      description: t('toasts.reportSuccessDescription'),
    });
    return { success: true };
  }
};
