
import { useState, useRef } from 'react';
import { Camera, Upload, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface CameraCaptureProps {
  onCapture: (files: File[]) => void;
}

const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: true 
      });
      setStream(mediaStream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error('Kunde inte komma åt kameran', {
        description: 'Kontrollera att du har gett tillstånd för kameraåtkomst.'
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
    setIsRecording(false);
    setMediaRecorder(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `drone-foto-${Date.now()}.jpg`, { 
              type: 'image/jpeg' 
            });
            onCapture([file]);
            toast.success('Foto taget!');
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const startVideoRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `drone-video-${Date.now()}.webm`, { 
          type: 'video/webm' 
        });
        onCapture([file]);
        toast.success('Video inspelad!');
      };
      
      setRecordedChunks(chunks);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onCapture(files);
      toast.success(`${files.length} fil(er) uppladdade!`);
    }
  };

  return (
    <div className="space-y-4">
      {!isCapturing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={startCamera} 
            className="h-24 flex-col space-y-2"
            variant="outline"
          >
            <Camera className="w-8 h-8" />
            <span>Öppna Kamera</span>
          </Button>
          
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            className="h-24 flex-col space-y-2"
            variant="outline"
          >
            <Upload className="w-8 h-8" />
            <span>Ladda upp filer</span>
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg"
              />
              
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={stopCamera}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {isRecording && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-medium animate-pulse">
                  REC
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4 mt-4">
              <Button onClick={capturePhoto} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Ta Foto
              </Button>
              
              {!isRecording ? (
                <Button onClick={startVideoRecording} variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Spela in Video
                </Button>
              ) : (
                <Button onClick={stopVideoRecording} variant="destructive">
                  Stoppa Inspelning
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
