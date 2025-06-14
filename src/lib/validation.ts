
import { z } from 'zod';

// Form validation schemas
export const reportFormSchema = z.object({
  description: z.string()
    .min(10, 'Beskrivningen måste vara minst 10 tecken')
    .max(1000, 'Beskrivningen får inte vara längre än 1000 tecken')
    .refine(val => !/<script|javascript:|vbscript:|on\w+=/i.test(val), 'Otillåten kod upptäckt'),
  
  droneSize: z.enum(['', 'small', 'medium', 'large']),
  
  droneColor: z.string()
    .max(50, 'Färgbeskrivning får inte vara längre än 50 tecken')
    .refine(val => !/<script|javascript:|vbscript:|on\w+=/i.test(val), 'Otillåten kod upptäckt'),
  
  flightPattern: z.enum(['', 'hovering', 'circular', 'linear', 'erratic']),
  
  duration: z.enum(['', '<1min', '1-5min', '5-15min', '15min+']),
  
  numberOfDrones: z.enum(['1', '2', '3-5', '5+']),
  
  contactInfo: z.string()
    .max(100, 'Kontaktinformation får inte vara längre än 100 tecken')
    .refine(val => !/<script|javascript:|vbscript:|on\w+=/i.test(val), 'Otillåten kod upptäckt')
    .optional(),
  
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']),

  external_link_url: z.string().url("Ange en giltig webbadress.").optional().or(z.literal('')),
});

// Location validation
export const locationSchema = z.object({
  lat: z.number()
    .min(-90, 'Latitud måste vara mellan -90 och 90')
    .max(90, 'Latitud måste vara mellan -90 och 90'),
  lng: z.number()
    .min(-180, 'Longitud måste vara mellan -180 och 180')
    .max(180, 'Longitud måste vara mellan -180 och 180'),
  accuracy: z.number().min(0)
});

// File validation
export const fileSchema = z.object({
  size: z.number().max(10 * 1024 * 1024, 'Filen får inte vara större än 10MB'),
  type: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'].includes(type),
    'Endast bilder (JPEG, PNG, WebP) och videor (MP4, WebM) är tillåtna'
  )
});

export type ReportFormData = z.infer<typeof reportFormSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type FileData = z.infer<typeof fileSchema>;
