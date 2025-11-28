"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera access blocked:", error);
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
  };

  return (
    <div className="space-y-4">
      {/** biome-ignore lint/a11y/useMediaCaption: <> */}
      <video ref={videoRef} className="w-full rounded-lg bg-black" />

      <button
      type="button"
        onClick={startCamera}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Camera
      </button>

      <button
      type="button"
        onClick={capturePhoto}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Capture Photo
      </button>

      <canvas ref={canvasRef} className="hidden" />

      {image && (
        <Image
          src={image}
          alt="Captured"
          className="w-full rounded-lg border mt-4"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
