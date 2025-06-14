
import { useState, useRef } from 'react';
import { Camera, Upload, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { validateFile } from '@/lib/security';

interface SecureCameraCaptureProps {
  onCapture: (files: File[]) => void;
}

const SecureCameraCapture = ({ onCapture }: SecureCameraCaptureProps) => {
  const [capturedFiles, setCapturedFiles] = useState<File[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      toast.error('Fil(er) nekades', {
        description: errors.join('; ')
      });
    }

    if (validFiles.length > 0) {
      const newFiles = [...capturedFiles, ...validFiles];
      
      // Limit total files to 5
      if (newFiles.length > 5) {
        toast.error('För många filer', {
          description: 'Maxmalt 5 filer tillåtna'
        });
        return;
      }

      setCapturedFiles(newFiles);
      onCapture(newFiles);
      toast.success(`${validFiles.length} fil(er) tillagda`);
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileValidation(e.target.files);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileValidation(e.target.files);
  };

  const removeFile = (index: number) => {
    const newFiles = capturedFiles.filter((_, i) => i !== index);
    setCapturedFiles(newFiles);
    onCapture(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Säker Filuppladdning</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Ladda upp bilder eller videor (max 10MB per fil, 5 filer totalt)
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <div className="flex items-center text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Endast JPEG, PNG, WebP bilder och MP4, WebM videor accepteras
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Camera Capture */}
            <Button
              onClick={() => cameraInputRef.current?.click()}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2"
              disabled={capturedFiles.length >= 5}
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm">Ta Foto/Video</span>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*,video/*"
                capture="environment"
                multiple
                onChange={handleCameraCapture}
                className="hidden"
              />
            </Button>

            {/* File Upload */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2"
              disabled={capturedFiles.length >= 5}
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Ladda upp fil</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </Button>
          </div>

          {/* File List */}
          {capturedFiles.length > 0 && (
            <div className="space-y-2">
              <h5 className="font-medium">Uppladdade filer:</h5>
              {capturedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {file.type.startsWith('image/') ? 'Bild' : 'Video'}
                    </Badge>
                    <span className="text-sm truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {capturedFiles.length >= 5 && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              Maxmalt antal filer uppnått (5/5)
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureCameraCapture;
